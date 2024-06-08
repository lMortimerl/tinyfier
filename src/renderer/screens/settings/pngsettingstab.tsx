import { Box, BoxProps } from '@mui/material';
import { PngSettings, ValueChangeHandler } from '@types';
import * as React from 'react';
import Slider from '@renderer/components/slider';
import Switch from '@renderer/components/switch';

interface PngSettingsProps extends BoxProps {}

export default function PngSettingsTab({ ...rest }: PngSettingsProps) {
	const pngSettings = window.electron.ipcRenderer.get(
		'pngOptions',
	) as PngSettings;
	const [updatedPngSettings, setUpdatedPngSettings] =
		React.useState<PngSettings>(pngSettings);

	const valueChangeHandler: ValueChangeHandler = (
		key: string,
		value: any,
	) => {
		updatedPngSettings[key as keyof PngSettings] = value;
		setUpdatedPngSettings(updatedPngSettings);
		window.electron.ipcRenderer.set('pngOptions', updatedPngSettings);
	};

	return (
		<Box {...rest}>
			<Slider
				value={updatedPngSettings.compressionLevel}
				min={0}
				max={9}
				label="Compression Level"
				property="compressionLevel"
				onValueChange={valueChangeHandler}
			/>
			<Slider
				value={updatedPngSettings.quality}
				min={1}
				max={100}
				label="Quality"
				property="quality"
				onValueChange={valueChangeHandler}
			/>
			<Slider
				value={updatedPngSettings.effort}
				min={1}
				max={10}
				label="Effort"
				property="effort"
				onValueChange={valueChangeHandler}
			/>
			<Slider
				value={updatedPngSettings.colors}
				min={1}
				max={1024}
				label="Colors"
				property="colors"
				onValueChange={valueChangeHandler}
			/>
			<Switch
				on={updatedPngSettings.palette}
				onValueChange={valueChangeHandler}
				property="palette"
				label="Palette"
			/>
			<Switch
				on={updatedPngSettings.progressive}
				onValueChange={valueChangeHandler}
				property="progressive"
				label="Progressive"
			/>
		</Box>
	);
}
