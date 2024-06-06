/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { IpcMainEvent } from 'electron';
import sharp from 'sharp';
import fs from 'fs';

export default async function handleCompression(
	event: IpcMainEvent,
	...args: any[]
): Promise<void> {
	const { files }: { files: string[] } = args[0];
	let processedFiles = 0;
	files.map(async (file: string) => {
		const image = fs.readFileSync(file);
		sharp(image)
			.jpeg()
			.toBuffer()
			.then((buffer) => {
				fs.writeFileSync(file, buffer);
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
