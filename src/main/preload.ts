// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { Settings } from '@types';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'settings:set' | 'settings:get' | 'app:compression';

const electronHandler = {
	ipcRenderer: {
		sendMessage(channel: Channels, ...args: unknown[]) {
			ipcRenderer.send(channel, ...args);
		},
		on(channel: Channels, func: (...args: any[]) => void) {
			const subscription = (
				_event: IpcRendererEvent,
				...args: unknown[]
			) => func(...args);
			ipcRenderer.on(channel, subscription);

			return () => {
				ipcRenderer.removeListener(channel, subscription);
			};
		},
		once(channel: Channels, func: (...args: any[]) => void) {
			ipcRenderer.once(channel, (_event, ...args) => func(...args));
		},
		get(key: keyof Settings) {
			return ipcRenderer.sendSync('settings:get', key);
		},
		set(key: keyof Settings, value: any) {
			ipcRenderer.send('settings:set', key, value);
		},
	},
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
