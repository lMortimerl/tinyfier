import { app } from 'electron';
import fs from 'fs';
import { Settings } from '@types';
import path from 'path';

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
