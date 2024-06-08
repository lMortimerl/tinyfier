import { Box, Grid, Input, Slider, Typography } from '@mui/material';
import { WebpOptionsChangeHandler } from '@types';
import React from 'react';

export default function WebpQuality({
	onChange,
	value,
}: {
	onChange: WebpOptionsChangeHandler;
	value: number | undefined;
}) {
	const [webpQuality, setWebpQuality] = React.useState<number>(value ?? 80);
	const handleWebpQualtiySliderChange = (
		event: Event,
		newValue: number | number[],
	) => {
		setWebpQuality(newValue as number);
		onChange('quality', newValue);
	};
	const handleWebpQualtiyInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setWebpQuality(
			event.target.value === '' ? 1 : Number(event.target.value),
		);
		onChange('quality', webpQuality);
	};
	const handleWebpQualityInputBlur = () => {
		if (webpQuality <= 0) {
			setWebpQuality(1);
		} else if (webpQuality > 100) {
			setWebpQuality(100);
		}
	};

	return (
		<Box>
			<Typography>Quality</Typography>
			<Grid container spacing={2}>
				<Grid item xs>
					<Slider
						value={
							typeof webpQuality === 'number' ? webpQuality : 0
						}
						onChange={handleWebpQualtiySliderChange}
						aria-labelledby="input-slider"
						min={1}
						max={100}
					/>
				</Grid>
				<Grid item>
					<Input
						value={webpQuality}
						size="small"
						onChange={handleWebpQualtiyInputChange}
						onBlur={handleWebpQualityInputBlur}
						inputProps={{
							step: 10,
							min: 1,
							max: 100,
							type: 'number',
							'aria-labelledby': 'input-slider',
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
