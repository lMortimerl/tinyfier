import {
	Box,
	BoxProps,
	FormControl,
	InputLabel,
	MenuItem,
	Select as MUISelect,
	SelectChangeEvent,
} from '@mui/material';
import { ValueChangeHandler } from '@types';
import * as React from 'react';

export interface SelectProps extends BoxProps {
	value?: string;
	options: string[];
	property: string;
	label: string;
	onValueChange: ValueChangeHandler;
}

export default function Select({
	value,
	property,
	onValueChange,
	label,
	options,
	...rest
}: SelectProps) {
	const [currentValue, setCurrentValue] = React.useState<string>(
		value ?? options[0],
	);
	const htmlSelectId = `${property}-select`;
	const htmlLabelId = `${property}-label`;

	const handleChange = (event: SelectChangeEvent) => {
		setCurrentValue(event.target.value);
		onValueChange(property, event.target.value);
	};

	return (
		<Box {...rest}>
			<FormControl fullWidth>
				<InputLabel id={htmlLabelId}>Preset</InputLabel>
				<MUISelect
					value={currentValue}
					fullWidth
					labelId={htmlLabelId}
					id={htmlSelectId}
					label={label}
					onChange={handleChange}
				>
					{options.map((option) => {
						return (
							<MenuItem value={option} key={option}>
								{option}
							</MenuItem>
						);
					})}
				</MUISelect>
			</FormControl>
		</Box>
	);
}
