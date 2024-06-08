import { Box, BoxProps } from '@mui/material';
import Select from '@renderer/components/select';
import Slider from '@renderer/components/slider';
import Switch from '@renderer/components/switch';
import { ValueChangeHandler, WebpSettings } from '@types';
import React from 'react';

interface WebpSettingsProps extends BoxProps {}

export default function WebpSettingsTab(props: WebpSettingsProps) {
	const webpSettings = window.electron.ipcRenderer.get(
		'webpOptions',
	) as WebpSettings;
	const [updatedWebpSettings, setUpdatedWebpSettings] =
		React.useState<WebpSettings>(webpSettings);

	const valueChangeHandler: ValueChangeHandler = (
		key: string,
		value: any,
	) => {
		updatedWebpSettings[key as keyof WebpSettings] = value;
		setUpdatedWebpSettings(updatedWebpSettings);
		window.electron.ipcRenderer.set('webpOptions', updatedWebpSettings);
	};

	return (
		<Box {...props}>
			<Slider
				property="quality"
				label="Quality"
				min={1}
				max={100}
				onValueChange={valueChangeHandler}
				value={updatedWebpSettings.quality}
			/>
			<Slider
				property="alphaQuality"
				label="Alpha Quality"
				min={1}
				max={100}
				value={updatedWebpSettings.alphaQuality}
				onValueChange={valueChangeHandler}
			/>
			<Switch
				label="Lossless"
				onValueChange={valueChangeHandler}
				property="lossless"
				on={updatedWebpSettings.lossless}
			/>
			<Switch
				label="Near Lossless"
				onValueChange={valueChangeHandler}
				property="nearLossless"
				on={updatedWebpSettings.lossless}
			/>
			<Select
				property="preset"
				value={updatedWebpSettings.preset}
				label="Preset"
				onValueChange={valueChangeHandler}
				options={[
					'default',
					'picture',
					'photo',
					'drawing',
					'icon',
					'text',
				]}
				sx={{
					mt: '12px',
				}}
			/>
		</Box>
	);
}
