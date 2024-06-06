import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from '@screens/mainscreen';
import SettingsScreen from '@screens/settingsscreen';
import Tinyfier from './components/tinyfier';

export default function App() {
	return (
		<Router>
			<Tinyfier>
				<Routes>
					<Route path="/" element={<MainScreen />} />
					<Route path="/settings" element={<SettingsScreen />} />
				</Routes>
			</Tinyfier>
		</Router>
	);
}
