// Modules
import React from 'react';
import { BrowserRouter as Router, Route, useHistory, HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

// Components
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import TestPage from './components/TestPage/TestPage';
import LoginPage from './components/LoginPage/LoginPage';
import AboutPage from './components/AboutPage/AboutPage';

// Styles
import './style/style.css'
import theme from './theme/theme';

function App() {
    const history = useHistory();
    // For BrowswerRouter: basename="/mctest-dev"
    return (
	<ThemeProvider theme={theme}>
		<HashRouter history={history} >
            <Navbar />
            <Route exact path="/" component={HomePage}>
			</Route>
			<Route path="/test" component={TestPage}>
			</Route>
			<Route path="/login" component={LoginPage}>
			</Route>
            <Route path="/about" component={AboutPage}>
			</Route>
		</HashRouter>
	</ThemeProvider>
    );
}

export default App;