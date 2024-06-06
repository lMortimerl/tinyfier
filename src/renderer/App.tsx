import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from '@screens/mainscreen';
import SettingsScreen from '@screens/settingsscreen';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainScreen />} />
				<Route path="/settings" element={<SettingsScreen />} />
			</Routes>
		</Router>
	);
}
