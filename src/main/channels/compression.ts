/* eslint-disable no-console */
import { AvailableFormats, Settings } from '@types';
import { IpcMainEvent } from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export default async function handleCompression(
	event: IpcMainEvent,
	store: Store<Settings>,
	...args: any[]
): Promise<void> {
	const targetFormat: AvailableFormats = store.get(
		'targetFormat',
	) as AvailableFormats;
	const replaceOriginal = store.get('replaceOriginal');
	const { files }: { files: string[] } = args[0];
	let processedFiles = 0;

	files.map(async (filePath: string) => {
		const image = fs.readFileSync(filePath);
		const oldFileExtension = path.extname(filePath);
		const newFileExtension = `.${targetFormat}`;
		const newFilename = path
			.basename(filePath)
			.replace(oldFileExtension, `-tinyfied${newFileExtension}`);
		const newFilePath = path.join(path.dirname(filePath), newFilename);
		const options = store.get(`${targetFormat}Options`);
		sharp(image)
			[targetFormat](options)
			.toBuffer()
			.then((buffer) => {
				fs.writeFileSync(
					replaceOriginal
						? filePath.replace(oldFileExtension, newFileExtension)
						: newFilePath,
					buffer,
				);
				processedFiles += 1;
				event.reply('app:compression', {
					progress: (processedFiles / files.length) * 100,
					type: 'success',
					message: 'Image compression was successfull.',
				});
				return true;
			})
			.catch((reason) => {
				processedFiles += 1;
				event.reply('app:compression', {
					progress: (processedFiles / files.length) * 100,
					type: 'error',
					message: reason,
				});
			});
	});
}
