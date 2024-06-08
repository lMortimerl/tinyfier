import * as React from 'react';
import { Box, FormControl, FormControlLabel, Switch } from '@mui/material';
import { WebpOptionsChangeHandler } from '@types';

export default function WebpLossless({
	onChange,
	value,
}: {
	onChange: WebpOptionsChangeHandler;
	value: boolean | undefined;
}) {
	const [lossless, setLossless] = React.useState<boolean>(value ?? false);
	const handleLosslessChange = (
		event: React.SyntheticEvent<HTMLInputElement>,
	) => {
		const newValue = event.currentTarget.checked;
		setLossless(newValue);
		onChange('lossless', newValue);
	};
	return (
		<Box>
			<FormControl>
				<FormControlLabel
					control={
						<Switch
							onChange={handleLosslessChange}
							checked={lossless}
						/>
					}
					label="Lossless"
				/>
			</FormControl>
		</Box>
	);
}
