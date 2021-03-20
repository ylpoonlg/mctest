import { Button, Container } from '@material-ui/core'
import React from 'react';
import colors from '../../theme/colors';
import './navbar.css';

function MobileMenu(props) {

    return (
        <div className="mobile-menu"
            onClick={props.onClick}
            style={{
                backgroundColor: colors.primary.main,
        }}>
            <button className="mobile-item" onClick={props.newTestClick}>
                New Test
            </button>
            <button className="mobile-item" onClick={props.loginClick}>
                Login
            </button>
            <button className="mobile-item" onClick={props.aboutClick}>
                About
            </button>
            <button className="mobile-item" onClick={props.helpClick}>
                Help
            </button>
        </div>
    )
}

export default MobileMenu
