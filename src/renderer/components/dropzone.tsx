import * as React from 'react';
import { DropEvent, useDropzone } from 'react-dropzone';
import { Box, useTheme } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import styles from '@styles/components/dropzone.module.scss';

export type DropZoneCallback = (files: File[], event: DropEvent) => void;

export default function DropZone({ callback }: { callback: DropZoneCallback }) {
	const theme = useTheme();

	const { getRootProps, getInputProps } = useDropzone({
		onDropAccepted: (files, event) => {
			callback(files, event);
		},
	});

	return (
		<Box
			{...getRootProps({
				className: `${styles.dropZone}`,
			})}
			sx={{
				transition: 'background-color .25s ease',
				'&:hover': {
					backgroundColor: theme.palette.primary.main,
					cursor: 'pointer',
				},
			}}
		>
			<input {...getInputProps({ className: styles.inputZone })} />
			<div className={styles.dropZoneContent}>
				<div>
					<ImageIcon />
					<p>Drop Images Here</p>
				</div>
			</div>
		</Box>
	);
}
