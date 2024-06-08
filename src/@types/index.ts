import sharp, { PresetEnum } from 'sharp';

export type AvailableFormats = 'webp' | 'png' | 'jpeg';
export type Settings = {
	targetFormat: AvailableFormats;
	replaceOriginal: boolean;
	webpOptions?: sharp.WebpOptions;
	jpegOptions?: sharp.JpegOptions;
	pngOptions?: sharp.PngOptions;
};
export type WebpCompressionPreset = keyof PresetEnum;
export type WebpOptionsChangeHandler = (
	key: keyof sharp.WebpOptions,
	value: any,
) => void;
