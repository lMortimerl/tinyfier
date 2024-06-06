import * as React from 'react';
import styles from '@styles/components/dropzone.module.scss';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';

export type DropZoneCallback = (
	acceptedFiles: File[],
	fileRejections: FileRejection[],
	event: DropEvent,
) => void;

export default function DropZone({ callback }: { callback: DropZoneCallback }) {
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: callback,
	});

	return (
		<Box
			{...getRootProps({ className: styles.dropZone })}
			sx={{
				bgcolor: 'primary',
				'&:hover': {
					bgcolor: 'primary.dark',
					cursor: 'pointer',
				},
				transition: 'background-color .25s ease',
			}}
			border="1px dashed"
			borderColor="primary-light"
			borderRadius={4}
		>
			<input {...getInputProps({ className: styles.inputZone })} />
			<div className={styles.dropZoneContent}>
				<p>Drop Images Here</p>
			</div>
		</Box>
	);
}
