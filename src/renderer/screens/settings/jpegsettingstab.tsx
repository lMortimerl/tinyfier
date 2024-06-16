import { Box, BoxProps } from '@mui/material';
import Slider from '@renderer/components/slider';
import Switch from '@renderer/components/switch';
import { JpegSettings, ValueChangeHandler } from '@types';
import * as React from 'react';

export interface JpegSettingsProps extends BoxProps {}

export default function JpegSettingsTab({ ...rest }: JpegSettingsProps) {
	const [updatedJpegSettings, setUpdatedJpegSettings] =
		React.useState<JpegSettings>(
			window.electron.ipcRenderer.get('jpegOptions'),
		);

	const valueChangeHandler: ValueChangeHandler = (
		key: string,
		value: any,
	) => {
		updatedJpegSettings[key as keyof JpegSettings] = value;
		setUpdatedJpegSettings(updatedJpegSettings);
		window.electron.ipcRenderer.set('jpegOptions', updatedJpegSettings);
	};

	return (
		<Box {...rest}>
			<Slider
				value={updatedJpegSettings.quality}
				min={1}
				max={100}
				label="Quality"
				property="quality"
				onValueChange={valueChangeHandler}
			/>
			<Switch
				label="Progressive"
				onValueChange={valueChangeHandler}
				property="progressive"
				on={updatedJpegSettings.progressive}
			/>
			<Switch
				label="Trellis Quantisation"
				onValueChange={valueChangeHandler}
				property="trellisQuantisation"
				on={updatedJpegSettings.trellisQuantisation}
			/>
			<Switch
				label="Overshoot Deringing"
				onValueChange={valueChangeHandler}
				property="overshootDeringing"
				on={updatedJpegSettings.overshootDeringing}
			/>
			<Switch
				label="Optimize Scans"
				onValueChange={valueChangeHandler}
				property="optimizeScans"
				on={updatedJpegSettings.optimizeScans}
			/>
			<Switch
				label="Optimize Coding"
				onValueChange={valueChangeHandler}
				property="optimizeCoding"
				on={updatedJpegSettings.optimizeCoding}
			/>
			<Slider
				value={updatedJpegSettings.quantisationTable}
				min={0}
				max={8}
				label="Quantisation Table"
				property="quantisationTable"
				onValueChange={valueChangeHandler}
			/>
			<Switch
				label="Mozjpeg"
				onValueChange={valueChangeHandler}
				property="mozjpeg"
				on={updatedJpegSettings.mozjpeg}
			/>
		</Box>
	);
}
