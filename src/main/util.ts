/* eslint import/prefer-default-export: off */
import { Settings } from '@types';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

export function resolveHtmlPath(htmlFileName: string) {
	if (process.env.NODE_ENV === 'development') {
		const port = process.env.PORT || 1212;
		const url = new URL(`http://localhost:${port}`);
		url.pathname = htmlFileName;
		return url.href;
	}
	return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

const SETTINGS_FILENAME = 'config.json';
const SETTINGS_FOLDER = 'Tinyfier';
export const APPDATA_FOLDER = path.join(
	app.getPath('appData'),
	SETTINGS_FOLDER,
);
const SETTINGS_FILEPATH = path.join(APPDATA_FOLDER, SETTINGS_FILENAME);

const defaultSettings: Settings = {
	targetFormat: 'webp',
	replaceOriginal: false,
	webpOptions: {
		alphaQuality: 100,
		quality: 80,
		lossless: false,
		nearLossless: false,
		smartSubsample: false,
		effort: 4,
		minSize: false,
		mixed: false,
		preset: 'default',
	},
	pngOptions: {
		progressive: false,
		compressionLevel: 6,
		adaptiveFiltering: false,
		quality: 100,
		effort: 7,
		palette: false,
		colors: 256,
		dither: 1.0,
	},
	jpegOptions: {
		quality: 80,
		progressive: false,
		chromaSubsampling: '4:2:0',
		trellisQuantisation: false,
		overshootDeringing: false,
		optimizeScans: false,
		optimizeCoding: true,
		quantisationTable: 0,
		mozjpeg: false,
	},
};

export function loadSettings(): Settings {
	if (!fs.existsSync(APPDATA_FOLDER)) fs.mkdirSync(APPDATA_FOLDER);
	if (!fs.existsSync(SETTINGS_FILEPATH)) {
		return defaultSettings;
	}

	const settingsDataRaw = fs.readFileSync(SETTINGS_FILEPATH, 'utf-8');
	const settingsData: Settings = JSON.parse(settingsDataRaw);
	return { ...defaultSettings, ...settingsData };
}
export function saveSettings(settings: Settings): void {
	if (!fs.existsSync(APPDATA_FOLDER)) fs.mkdirSync(APPDATA_FOLDER);
	const settingsDataRaw = JSON.stringify(settings);
	fs.writeFileSync(SETTINGS_FILEPATH, settingsDataRaw);
}
