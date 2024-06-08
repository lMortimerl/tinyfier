import {
	Box,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { AvailableFormats } from '@types';
import * as React from 'react';
import WebpSettings from './settings/webpsettings';

export default function SettingsScreen() {
	const [targetFormat, setTargetFormat] = React.useState(
		window.electron.ipcRenderer.get('targetFormat'),
	);
	const [replaceOriginal, setReplaceOriginal] = React.useState(
		window.electron.ipcRenderer.get('replaceOriginal'),
	);
	const formats: AvailableFormats[] = ['jpeg', 'png', 'webp'];

	const handleTargetFormatChange = (event: SelectChangeEvent) => {
		window.electron.ipcRenderer.set(
			'targetFormat',
			event.target.value as string,
		);
		setTargetFormat(event.target.value as string);
	};
	const handleReplaceOriginalChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		window.electron.ipcRenderer.set(
			'replaceOriginal',
			event.target.checked,
		);
		setReplaceOriginal(event.target.checked);
	};

	return (
		<article>
			<h1>Settings</h1>
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
			<FormControlLabel
				control={
					<Checkbox
						onChange={handleReplaceOriginalChange}
						checked={replaceOriginal}
					/>
				}
				label="Replace Original?"
			/>
			<Divider />
			<h3>Advanced</h3>
			<Container>
				<WebpSettings
					properties={{
						display: targetFormat === 'webp' ? 'block' : 'none',
					}}
				/>
				<Box
					id="jpeg-settings"
					sx={{
						display: targetFormat === 'jpeg' ? 'block' : 'none',
					}}
				>
					<h4>Jpeg format</h4>
				</Box>
				<Box
					id="png-settings"
					sx={{
						display: targetFormat === 'png' ? 'block' : 'none',
					}}
				>
					<h4>Png format</h4>
				</Box>
			</Container>
		</article>
	);
}
