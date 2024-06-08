import sharp, { PresetEnum } from 'sharp';

export type AvailableFormats = 'webp' | 'png' | 'jpeg';
export interface FormatOptions {}
export interface WebpSettings extends FormatOptions, sharp.WebpOptions {}
export interface PngSettings extends FormatOptions, sharp.PngOptions {}
export interface JpegSettings extends FormatOptions, sharp.JpegOptions {}
export type Settings = {
	targetFormat: AvailableFormats;
	replaceOriginal: boolean;
	webpOptions?: WebpSettings;
	pngOptions?: PngSettings;
	jpegOptions?: JpegSettings;
};
export type WebpCompressionPreset = keyof PresetEnum;

export type ValueChangeHandler = (key: string, value: any) => void;
