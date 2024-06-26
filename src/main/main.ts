/* eslint global-require: off, no-console: off, promise/always-return: off */

import { Settings } from '@types';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import Store from 'electron-store';
import path from 'path';
import handleCompression from './channels/compression';
import { resolveHtmlPath, loadSettings, saveSettings } from './util';

let mainWindow: BrowserWindow | null = null;

const settings = loadSettings();
const store = new Store({ defaults: settings });
ipcMain.on('settings:get', async (event, key) => {
	event.returnValue = store.get(key);
});
ipcMain.on('settings:set', async (event, key, value) => {
	event.returnValue = store.set(key, value);
});

ipcMain.on('app:compression', (event, ...args) => {
	handleCompression(event, store, ...args);
});

if (process.env.NODE_ENV === 'production') {
	const sourceMapSupport = require('source-map-support');
	sourceMapSupport.install();
}

const isDebug =
	process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
	require('electron-debug')();
}

const installExtensions = async () => {
	const installer = require('electron-devtools-installer');
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
	// const extensions = ['REACT_DEVELOPER_TOOLS'];
	const extensions: string[] = [];

	return installer
		.default(
			extensions.map((name) => installer[name]),
			forceDownload,
		)
		.catch(console.log);
};

const createWindow = async () => {
	if (isDebug) {
		await installExtensions();
	}

	const RESOURCES_PATH = app.isPackaged
		? path.join(process.resourcesPath, 'assets')
		: path.join(__dirname, '../../assets');

	const getAssetPath = (...paths: string[]): string => {
		return path.join(RESOURCES_PATH, ...paths);
	};

	const targetWidth = 375;
	const targetHeight = 700;

	mainWindow = new BrowserWindow({
		show: false,
		width: targetWidth + (isDebug ? 580 : 0),
		height: targetHeight,
		resizable: false,
		icon: getAssetPath('icon.png'),
		webPreferences: {
			preload: app.isPackaged
				? path.join(__dirname, 'preload.js')
				: path.join(__dirname, '../../.erb/dll/preload.js'),
		},
	});
	mainWindow.setMenuBarVisibility(false);

	mainWindow.loadURL(resolveHtmlPath('index.html'));

	mainWindow.on('ready-to-show', () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined');
		}
		if (process.env.START_MINIMIZED) {
			mainWindow.minimize();
		} else {
			mainWindow.show();
		}
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// Open urls in the user's browser
	mainWindow.webContents.setWindowOpenHandler((edata) => {
		shell.openExternal(edata.url);
		return { action: 'deny' };
	});
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
	// Respect the OSX convention of having the application in memory even
	// after all windows have been closed
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.whenReady()
	.then(() => {
		createWindow();
		app.on('activate', () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (mainWindow === null) createWindow();
		});
	})
	.catch(console.log);

app.on('before-quit', () => {
	saveSettings(store.store as Settings);
});
