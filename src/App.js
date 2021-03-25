import * as firebaseAPI from './firebase/api';
// Modules
import React from 'react';
import { BrowserRouter as Router, Route, useHistory, HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

// Components
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import TestPage from './components/TestPage/TestPage';
import ResultPage from './components/ResultPage/ResultPage';
import LoginPage from './components/LoginPage/LoginPage';
import AboutPage from './components/AboutPage/AboutPage';
import HelpPage from './components/HelpPage/HelpPage';
import UserPage from './components/UserPage/UserPage';
import MytestsPage from './components/MytestsPage/MytestsPage';

// Styles
import './style/style.css'
import theme from './theme/theme';

const baseSettings = {
    settings_dd: false,
    auto_next_q: true,
    subjects: ["Math", "Phy", "Chem"],
    papers: ["DSE", "CE", "AL"],
}

function App() {
    const history = useHistory();
    // For BrowswerRouter: basename="/mctest-dev"
    
    console.log("Checking settings");
    // Settings
    if (!localStorage.mc_settings) {
        console.log("No existing settings");
        localStorage.mc_settings = JSON.stringify(baseSettings);
    }

    return (
	<ThemeProvider theme={theme}>
		<HashRouter history={history} >
            <Navbar />
            <Route exact path="/" component={HomePage}></Route>
			<Route path="/test" component={TestPage}></Route>
            <Route path="/result" component={ResultPage}></Route>
			<Route path="/login" component={LoginPage}></Route>
            <Route path="/about" component={AboutPage}></Route>
			<Route path="/help" component={HelpPage}></Route>
            <Route path="/user" component={UserPage}></Route>
            <Route path="/mytests" component={MytestsPage}></Route>
		</HashRouter>
	</ThemeProvider>
    );
}

export default App;