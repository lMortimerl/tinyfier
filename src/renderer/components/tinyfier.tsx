import Navigation from '@components/navigation';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme, lightTheme } from '@renderer/lib/theme';
import * as React from 'react';
import '@styles/global/layout.scss';
import { useMediaQuery } from '@mui/material';

export default function Tinyfier({ children }: { children: React.ReactNode }) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = createTheme(prefersDarkMode ? darkTheme : lightTheme);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navigation />
			<main>{children}</main>
		</ThemeProvider>
	);
}
