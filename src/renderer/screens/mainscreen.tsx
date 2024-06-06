import * as React from 'react';
import DropZone, { DropZoneCallback } from '@renderer/components/dropzone';

export default function MainScreen() {
	const [files, setFiles] = React.useState<File[]>([]);

	const selectFilesCallback: DropZoneCallback = (acceptedFiles) => {
		setFiles(acceptedFiles);
	};

	return (
		<section>
			<DropZone callback={selectFilesCallback} />
		</section>
	);
}
