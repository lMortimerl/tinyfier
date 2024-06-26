import {
	Box,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	Input,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { AvailableFormats } from '@types';
import * as React from 'react';
import WebpSettingsTab from './settings/webpsettingstab';
import PngSettingsTab from './settings/pngsettingstab';
import JpegSettingsTab from './settings/jpegsettingstab';
import { CheckBox } from '@mui/icons-material';

export default function SettingsScreen() {
	const [targetFormat, setTargetFormat] = React.useState(
		window.electron.ipcRenderer.get('targetFormat'),
	);
	const [enableResize, setEnableResize] = React.useState(
		window.electron.ipcRenderer.get('resize'),
	);
	const [resizeTargetX, setResizeTargetX] = React.useState(
		window.electron.ipcRenderer.get('resizeTargetX'),
	);
	const [resizeTargetY, setResizeTargetY] = React.useState(
		window.electron.ipcRenderer.get('resizeTargetY'),
	);

	const formats: AvailableFormats[] = ['jpeg', 'png', 'webp'];

	const handleTargetFormatChange = (event: SelectChangeEvent) => {
		window.electron.ipcRenderer.set(
			'targetFormat',
			event.target.value as string,
		);
		setTargetFormat(event.target.value as string);
	};
	const handleEnableResizeChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		window.electron.ipcRenderer.set('resize', event.target.checked);
		setEnableResize(event.target.checked);
	}
	const handleResizeTargetX = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setResizeTargetX(event.target.value);
		window.electron.ipcRenderer.set('resizeTargetX', event.target.value);
	}
	const handleResizeTargetY = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setResizeTargetY(event.target.value);
		window.electron.ipcRenderer.set('resizeTargetY', event.target.value);
	}

	return (
		<article>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="label-target-format">Target Format</InputLabel>
						<Select
							value={targetFormat}
							fullWidth
							labelId="label-target-format"
							id="target-format"
							label="Target Format"
							onChange={handleTargetFormatChange}
						>
							{formats.map((value) => {
								return (
									<MenuItem value={value} key={value}>
										{value}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										onChange={handleEnableResizeChange}
										checked={enableResize}
									/>
								}
								label="Enable resizing?"
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sx={{ paddingTop: "12", display: (enableResize ? "block" : "none") }}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel>Size X</InputLabel>
								<Input
									name="resizeTargetX"
									onChange={handleResizeTargetX}
									value={`${resizeTargetX}`}
									type='number'
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel>Size Y</InputLabel>
								<Input
									name="resizeTargetY"
									onChange={handleResizeTargetY}
									value={`${resizeTargetY}`}
									type='number'
								/>
							</FormControl>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Divider sx={{ mt: '8px', mb: '12px' }} />
			<Container>
				<WebpSettingsTab
					display={targetFormat === 'webp' ? 'block' : 'none'}
				/>
				<PngSettingsTab
					display={targetFormat === 'png' ? 'block' : 'none'}
				/>
				<Box
					id="jpeg-settings"
					sx={{
						display: targetFormat === 'jpeg' ? 'block' : 'none',
					}}
				>
					<JpegSettingsTab />
				</Box>
			</Container>
		</article>
	);
}
