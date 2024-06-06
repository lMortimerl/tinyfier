import * as React from 'react';
import DropZone, { DropZoneCallback } from '@renderer/components/dropzone';
import {
	Alert,
	Box,
	Collapse,
	IconButton,
	LinearProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import '@styles/screens/mainscreen.scss';

export default function MainScreen() {
	const [processing, setProcessing] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const [error, setError] = React.useState<string>();
	const [success, setSuccess] = React.useState<string>();
	const [open, setOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		window.electron.ipcRenderer.once(
			'app:compression',
			(args: {
				message: string;
				progress: number;
				type: 'success' | 'error';
			}) => {
				if (args.type === 'error') setError(args.message);
				setProgress(args.progress);
				if (args.progress >= 100) {
					setProcessing(false);
					setProgress(0);
					setOpen(true);
					if (typeof error === 'undefined') setSuccess(args.message);
				}
			},
		);
	});

	const selectFilesCallback: DropZoneCallback = (acceptedFiles) => {
		setProcessing(true);
		setProgress(10);
		window.electron.ipcRenderer.sendMessage('app:compression', {
			files: acceptedFiles.map((value) => value.path),
		});
	};

	return (
		<div id="content">
			<div id="dropzone">
				<DropZone callback={selectFilesCallback} />
				<Box sx={{ width: '100%' }}>
					{processing ? (
						<LinearProgress
							value={progress}
							variant="determinate"
						/>
					) : (
						''
					)}
				</Box>
			</div>
			<Collapse in={open}>
				{typeof error !== 'undefined' ? (
					<Alert
						severity="error"
						variant="filled"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 2 }}
					>
						{error}
					</Alert>
				) : (
					''
				)}
				{typeof success !== 'undefined' ? (
					<Alert
						severity="success"
						variant="filled"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 2 }}
					>
						{success}
					</Alert>
				) : (
					''
				)}
			</Collapse>
		</div>
	);
}
