/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { IpcMainEvent } from 'electron';
import sharp from 'sharp';
import fs from 'fs';

export default async function handleCompression(
	event: IpcMainEvent,
	...args: any[]
): Promise<void> {
	const { files } = args[0];
	for (let index = 0; index < files.length; index += 1) {
		const file = files[index];
		const image = fs.readFileSync(file);
		const buffer = await sharp(image)
			.jpeg()
			.toBuffer()
			.catch((reason) => console.log(reason));

		if (typeof buffer !== 'undefined') {
			fs.writeFile(file, buffer, (err) => console.log(err));
			event.reply('ipc-compression', {
				progress: (index / files.length) * 100,
				message: 'success',
			});
		}
	}
}
