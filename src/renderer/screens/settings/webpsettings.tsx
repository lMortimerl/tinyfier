import { Box, BoxProps, SxProps } from '@mui/material';
import { WebpOptionsChangeHandler } from '@types';
import React from 'react';
import sharp from 'sharp';
import WebpAlphaQuality from './webp/webpalphaquality';
import WebpLossless from './webp/webplossless';
import WebpPreset from './webp/webppreset';
import WebpQuality from './webp/webpquality';
import WebpNearLossless from './webp/wepbnearlossless';

export default function WebpSettings({
	properties,
	sx,
}: {
	properties: BoxProps;
	sx?: SxProps;
}) {
	const webpSettings = window.electron.ipcRenderer.get(
		'webpOptions',
	) as sharp.WebpOptions;
	const [updatedWebpSettings, setUpdatedWebpSettings] =
		React.useState<sharp.WebpOptions>(webpSettings);

	const handleInputUpdate: WebpOptionsChangeHandler = (key, value) => {
		updatedWebpSettings[key] = value;
		setUpdatedWebpSettings(updatedWebpSettings);
		window.electron.ipcRenderer.set('webpOptions', updatedWebpSettings);
	};

	return (
		<Box display={properties.display} sx={sx}>
			<WebpPreset
				onChange={handleInputUpdate}
				value={webpSettings.preset}
				sx={{
					marginBottom: '12px',
				}}
			/>
			<WebpQuality
				onChange={handleInputUpdate}
				value={webpSettings.quality}
			/>
			<WebpAlphaQuality
				onChange={handleInputUpdate}
				value={webpSettings.alphaQuality}
			/>
			<WebpLossless
				onChange={handleInputUpdate}
				value={webpSettings.lossless}
			/>
			<WebpNearLossless
				onChange={handleInputUpdate}
				value={webpSettings.nearLossless}
			/>
		</Box>
	);
}
