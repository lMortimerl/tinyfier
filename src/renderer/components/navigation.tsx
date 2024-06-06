import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Navigation() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Tabs
			value={value}
			onChange={handleChange}
			aria-label="icon tabs example"
			variant="fullWidth"
		>
			<Tab
				component={Link}
				value="/"
				to="/"
				icon={<CropOriginalIcon />}
				label="Compression"
			/>
			<Tab
				component={Link}
				icon={<SettingsIcon />}
				value="/settings"
				to="/settings"
				label="Settings"
			/>
		</Tabs>
	);
}
