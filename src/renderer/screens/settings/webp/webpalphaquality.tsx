import { Box, Grid, Input, Slider, Typography } from '@mui/material';
import { WebpOptionsChangeHandler } from '@types';
import React from 'react';

export default function WebpAlphaQuality({
	onChange,
	value,
}: {
	onChange: WebpOptionsChangeHandler;
	value: number | undefined;
}) {
	const [webpAlphaQuality, setWebpAlphaQuality] = React.useState<number>(
		value ?? 100,
	);

	const handleWebpAlphaQualtiySliderChange = (
		event: Event,
		newValue: number | number[],
	) => {
		setWebpAlphaQuality(newValue as number);
		onChange('alphaQuality', newValue as number);
	};
	const handleWebpAlphaQualtiyInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newValue =
			event.target.value === '' ? 1 : Number(event.target.value);
		setWebpAlphaQuality(newValue);
		onChange('alphaQuality', newValue as number);
	};
	const handleWebpQualityInputBlur = () => {
		if (webpAlphaQuality <= 0) {
			setWebpAlphaQuality(1);
			onChange('alphaQuality', webpAlphaQuality);
		} else if (webpAlphaQuality > 100) {
			setWebpAlphaQuality(100);
			onChange('alphaQuality', webpAlphaQuality);
		}
	};

	return (
		<Box>
			<Typography id="alpha-quality">Alpha Quality</Typography>
			<Grid container spacing={2}>
				<Grid item xs>
					<Slider
						value={
							typeof webpAlphaQuality === 'number'
								? webpAlphaQuality
								: 0
						}
						onChange={handleWebpAlphaQualtiySliderChange}
						aria-labelledby="alpha-quality"
						min={1}
						max={100}
					/>
				</Grid>
				<Grid item>
					<Input
						value={webpAlphaQuality}
						size="small"
						onChange={handleWebpAlphaQualtiyInputChange}
						onBlur={handleWebpQualityInputBlur}
						inputProps={{
							step: 10,
							min: 1,
							max: 100,
							type: 'number',
							'aria-labelledby': 'alpha-quality',
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
