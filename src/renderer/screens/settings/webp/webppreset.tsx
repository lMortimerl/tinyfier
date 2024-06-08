import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	SxProps,
} from '@mui/material';
import { WebpCompressionPreset, WebpOptionsChangeHandler } from '@types';
import React from 'react';

export default function WebpPreset({
	onChange,
	value,
	sx,
}: {
	onChange: WebpOptionsChangeHandler;
	value: WebpCompressionPreset | undefined;
	sx?: SxProps;
}) {
	const compressionPresets: WebpCompressionPreset[] = [
		'default',
		'photo',
		'picture',
		'drawing',
		'icon',
		'text',
	];
	const [preset, setPreset] = React.useState<WebpCompressionPreset>(
		value ?? 'default',
	);
	const handleChange = (event: SelectChangeEvent) => {
		setPreset(event.target.value as WebpCompressionPreset);
		onChange('preset', event.target.value);
	};
	return (
		<FormControl fullWidth sx={sx}>
			<InputLabel id="label-preset">Preset</InputLabel>
			<Select
				value={preset}
				fullWidth
				labelId="label-preset"
				id="preset"
				label="Preset"
				onChange={handleChange}
			>
				{compressionPresets.map((compressionPreset) => {
					return (
						<MenuItem
							value={compressionPreset}
							key={compressionPreset}
						>
							{compressionPreset}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}
