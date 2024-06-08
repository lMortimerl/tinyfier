import * as React from 'react';
import { Box, FormControl, FormControlLabel, Switch } from '@mui/material';
import { WebpOptionsChangeHandler } from '@types';

export default function WebpNearLossless({
	onChange,
	value,
}: {
	onChange: WebpOptionsChangeHandler;
	value: boolean | undefined;
}) {
	const [nearLossless, setNearLossless] = React.useState<boolean>(
		value ?? false,
	);
	const handleNearLosslessChange = (
		event: React.SyntheticEvent<HTMLInputElement>,
	) => {
		const newValue = event.currentTarget.checked;
		setNearLossless(newValue);
		onChange('nearLossless', newValue);
	};
	return (
		<Box>
			<FormControl>
				<FormControlLabel
					control={
						<Switch
							onChange={handleNearLosslessChange}
							checked={nearLossless}
						/>
					}
					label="Near Lossless"
				/>
			</FormControl>
		</Box>
	);
}
