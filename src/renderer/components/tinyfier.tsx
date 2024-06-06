import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { darkTheme } from '@renderer/lib/theme';
import Navigation from '@components/navigation';

const theme = createTheme(darkTheme);

export default function Tinyfier({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navigation />
			<main>{children}</main>
		</ThemeProvider>
	);
}
