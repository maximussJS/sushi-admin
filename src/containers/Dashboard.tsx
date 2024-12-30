import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from '../components/AppNavBar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import AppTheme from '../theme/AppTheme';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme />

			<AppAppBar />
			<Container
				maxWidth="lg"
				component="main"
				sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
			>
				<MainContent />
			</Container>
			<Footer />
		</AppTheme>
	);
}