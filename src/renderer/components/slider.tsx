import { Box, BoxProps, Slider as MUISlider, Typography } from '@mui/material';
import { ValueChangeHandler } from '@types';
import * as React from 'react';

export interface SliderProps extends BoxProps {
	min: number;
	max: number;
	value?: number;
	label: string;
	property: string;
	onValueChange: ValueChangeHandler;
}

export default function Slider({
	value,
	min,
	max,
	property,
	label,
	onValueChange,
	...rest
}: SliderProps) {
	const [currentValue, setCurrentValue] = React.useState<number>(
		value as number,
	);
	const htmlId: string = `${property}-slider`;

	const changeHandlerSlider = (event: Event, newValue: number | number[]) => {
		setCurrentValue(newValue as number);
		onValueChange(property, newValue);
	};
	return (
		<Box {...rest}>
			<Typography id={htmlId} gutterBottom>
				{label}
			</Typography>
			<MUISlider
				value={currentValue}
				onChange={changeHandlerSlider}
				aria-labelledby={htmlId}
				min={min}
				max={max}
				valueLabelDisplay="auto"
			/>
		</Box>
	);
}
