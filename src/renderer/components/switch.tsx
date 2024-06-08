import {
	Box,
	BoxProps,
	FormControl,
	FormControlLabel,
	Switch as MUISwitch,
} from '@mui/material';
import { ValueChangeHandler } from '@types';
import * as React from 'react';

export interface SwitchProps extends BoxProps {
	property: string;
	on?: boolean;
	label: string;
	onValueChange: ValueChangeHandler;
}

export default function Switch({
	on,
	property,
	label,
	onValueChange,
	...rest
}: SwitchProps) {
	const [currentState, setCurrentState] = React.useState<boolean>(
		on ?? false,
	);
	const changeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
		const newState = event.currentTarget.checked;
		setCurrentState(newState);
		onValueChange(property, newState);
	};
	return (
		<Box {...rest}>
			<FormControl>
				<FormControlLabel
					control={
						<MUISwitch
							onChange={changeHandler}
							checked={currentState}
						/>
					}
					label={label}
				/>
			</FormControl>
		</Box>
	);
}
