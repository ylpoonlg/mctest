import { React, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, AppBar, Toolbar, makeStyles, Typography, useMediaQuery, Collapse, Slide, Avatar } from '@material-ui/core';

import logo_path from './lg_logo_72.png';
import { AddBoxOutlined } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import theme from '../../theme/theme';
import MobileMenu from './MobileMenu';

import * as auth from '../../firebase/auth';
import firebase from 'firebase';

const styles = makeStyles((theme) => ({
    logo: {
        width: "2rem",
        height: "2rem",
        marginLeft: "1rem",
        marginRight: "1rem",
    },
    title: {
        fontSize: "2rem",
        fontFamily: "Recursive, Roboto, sans-serif",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    spacer: {
        flexGrow: 1,
    },
    btn_1: {
        width: "max-content",
        height: "3rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
    },
    btn_r: {
        minWidth: 0,
        width: "3rem",
        height: "3rem",
        borderRadius: "10rem",
        padding: 0,
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
    },
}));

function Navbar() {
    const classes = styles();
    const history = useHistory();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imgURL, setImgURL] = useState("");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setIsLoggedIn(true);
            setImgURL(user.photoURL);
        } else {
            setIsLoggedIn(false);
            setImgURL("");
        }
    })

    // Link
    function newTestClick(e) {
        history.push("/");
    }
    function loginClick(e) {
        history.push("/login");
    }
    function aboutClick(e) {
        history.push("/about");
    }
    function helpClick(e) {
        history.push("/help");
    }

    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

    function mobileMenuClick(e) {
        setToggleMobileMenu(!toggleMobileMenu);
    }

    return (
        <>
        <AppBar className="navbar">
                <Toolbar style={{margin: 0, padding: 0}}>
                    {/* MOBILE */}
                    {isMobile ? ( <>
                        <Button className={classes.btn_1} variant="contained" color="primary"
                            onClick={mobileMenuClick}
                        >
                            <MenuIcon />
                        </Button>
                        <img src={logo_path} className={classes.logo}/>
                    </> ):( <>
                    {/* DESKTOP */}
                        <img src={logo_path} className={classes.logo}/>
                        <Typography className={classes.title}>MC Test Tool</Typography>
                        <Button className={classes.btn_1} variant="contained" color="primary" onClick={newTestClick}>
                            <AddBoxOutlined style={{marginRight: '0.5rem'}} />
                            New Test
                        </Button>
                        <Button className={classes.btn_r} variant="contained" color="primary" onClick={aboutClick}>
                            <InfoIcon />
                        </Button>
                        <Button className={classes.btn_r} variant="contained" color="primary" onClick={helpClick}>
                            <HelpIcon />
                        </Button>
                    </> )}

                    <div className={classes.spacer}></div>
                    
                    <Button className={classes.btn_1} variant="contained" color="primary" onClick={loginClick}>
                        { !isLoggedIn ?
                        "Login": ( <Avatar src={imgURL} /> )}
                    </Button>
                </Toolbar>
        </AppBar>
        <Toolbar></Toolbar>

        
        <Collapse in={(toggleMobileMenu && isMobile)} direction="down" timeout={{enter: 400, exit: 200}}>
            <div>
                <MobileMenu onClick={mobileMenuClick}
                    newTestClick={newTestClick}
                    loginClick={loginClick}
                    aboutClick={aboutClick}
                    helpClick={helpClick}
                />
            </div>
        </Collapse>

        </>
    );
}

export default Navbar
