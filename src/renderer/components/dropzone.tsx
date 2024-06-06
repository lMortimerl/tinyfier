import * as React from 'react';
import styles from '@styles/components/dropzone.module.scss';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { Box, createTheme } from '@mui/material';
import { darkTheme } from '@renderer/lib/theme';

export type DropZoneCallback = (
	acceptedFiles: File[],
	fileRejections: FileRejection[],
	event: DropEvent,
) => void;

export default function DropZone({ callback }: { callback: DropZoneCallback }) {
	const theme = createTheme(darkTheme);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: callback,
	});

	return (
		<Box
			{...getRootProps({ className: styles.dropZone })}
			sx={{
				transition: 'background-color .25s ease',
				'&:hover': {
					bgcolor: 'primary.dark',
					cursor: 'pointer',
				},
			}}
			border="1px dashed"
			borderColor="primary-light"
			borderRadius={4}
			onDragEnter={(event) => {
				event.currentTarget.style.backgroundColor =
					theme.palette.primary.dark;
			}}
			onDragLeave={(event) => {
				event.currentTarget.style.backgroundColor = 'transparent';
			}}
			onDrop={(event) => {
				event.currentTarget.style.backgroundColor = 'transparent';
			}}
		>
			<input {...getInputProps({ className: styles.inputZone })} />
			<div className={styles.dropZoneContent}>
				<p>Drop Images Here</p>
			</div>
		</Box>
	);
}
