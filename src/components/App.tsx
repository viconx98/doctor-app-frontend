import { Box, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import BaseAuth from "./Auth/BaseAuth"
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { blue } from '@mui/material/colors'
import UserSignup from './Auth/UserSignup';
import UserSignin from './Auth/UserSignin';
import DoctorSignup from './Auth/DoctorSignup';
import DoctorSignin from './Auth/DoctorSignin';
import DoctorOnboarding from "./Onboarding/DoctorOnboarding"
import UserOnboarding from './Onboarding/UserOnboarding';
import BaseHome from './Home/BaseHome';
import BrowseDoctors from './User/BrowseDoctors';

const appTheme = createTheme({
	typography: {
		fontFamily: [
			'Poppins',
		].join(','),
	},

	palette: {
		mode: "dark",
		primary: {
			main: blue[500],
			light: blue[100],
		}
	}
})

function App() {
	return <ThemeProvider theme={appTheme}>
		<CssBaseline />
		<Routes>
			<Route path="/" element={<BaseHome/>}>
				<Route index element={<BrowseDoctors/>} />
				
			</Route>

			<Route path="/auth" element={<BaseAuth />}>
				<Route index element={<UserSignin />} />
				<Route path="/auth/signup" element={<UserSignup />} />
				<Route path="/auth/doctor/signup" element={<DoctorSignup />} />
				<Route path="/auth/doctor/signin" element={<DoctorSignin />} />
			</Route>

			<Route path="/onboard/doctor" element={<DoctorOnboarding />} />
			<Route path="/onboard/user" element={<UserOnboarding />} />

		</Routes>
	</ThemeProvider>
}

export default App;
