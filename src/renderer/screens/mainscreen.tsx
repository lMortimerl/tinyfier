import * as React from 'react';
import DropZone, { DropZoneCallback } from '@renderer/components/dropzone';
import { Box, LinearProgress } from '@mui/material';

export default function MainScreen() {
	const [processing, setProcessing] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const selectFilesCallback: DropZoneCallback = (acceptedFiles) => {
		// setProcessing(true);
		// setProgress(10);
		window.electron.ipcRenderer.sendMessage('ipc-compression', {
			files: acceptedFiles.map((value) => value.path),
		});
	};

	return (
		<article id="dropzone">
			<DropZone callback={selectFilesCallback} />
			<Box sx={{ width: '100%' }}>
				{processing ? <LinearProgress value={progress} /> : ''}
			</Box>
		</article>
	);
}
