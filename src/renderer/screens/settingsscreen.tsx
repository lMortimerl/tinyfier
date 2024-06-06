import {
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import * as React from 'react';

export default function SettingsScreen() {
	const [targetFormat, setTargetFormat] = React.useState('webp');
	const [replaceOriginal, setReplaceOriginal] = React.useState(false);
	const formats = ['webp', 'jpg', 'png'];

	const handleTargetFormatChange = (event: SelectChangeEvent) => {
		setTargetFormat(event.target.value as string);
	};
	const handleReplaceOriginalChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
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
		</article>
	);
}
