import sharp from 'sharp';

export type AvailableFormats = 'webp' | 'png' | 'jpeg';
export type Settings = {
	targetFormat: AvailableFormats;
	replaceOriginal: boolean;
	webpOptions?: sharp.WebpOptions;
	jpegOptions?: sharp.JpegOptions;
	pngOptions?: sharp.PngOptions;
};
