import Navigation from '@components/navigation';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme } from '@renderer/lib/theme';
import * as React from 'react';
import '@styles/global/layout.scss';

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
