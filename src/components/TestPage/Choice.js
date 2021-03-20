import { Button, createMuiTheme, Grid, makeStyles, ThemeProvider } from '@material-ui/core'
import { React, useState } from 'react'

import colors from '../../theme/colors';
import './test.css';

const choiceTheme = createMuiTheme({
    palette: {
        primary: colors.choice.normal,
        secondary: colors.choice.selected,
    }
})

function Choice(props) {

    function select(e) {
        props.selectChoice(props.val);
    }

    return (
        <ThemeProvider theme={choiceTheme}>
            <Button className="choice" onClick={select}
                variant={props.isSelected?"contained":"outlined"} color={props.isSelected?"secondary":"primary"}
                style={{fontSize: "1.5rem"}}>{props.val}</Button>
        </ThemeProvider>
    )
}

export default Choice
