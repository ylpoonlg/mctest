import { Button, createMuiTheme, Grid, makeStyles, ThemeProvider } from '@material-ui/core'
import { React, useState } from 'react'
import colors from '../../theme/colors';
import { theme } from '../../theme/theme';

const styles = makeStyles((theme) => ({
    choice: {
        width: "10rem",
        height: "4rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "150%",
    }
}));

const choiceTheme = createMuiTheme({
    palette: {
        primary: colors.choice.normal,
        secondary: colors.choice.selected,
    }
})

function Choice(props) {
    const classes = styles();

    function select(e) {
        props.selectChoice(props.val);
    }

    return (
        <ThemeProvider theme={choiceTheme}>
            <Button variant={props.isSelected?"contained":"outlined"}
                className={classes.choice}
                color={props.isSelected?"secondary":"primary"}
                onClick={select}
            >{props.val}</Button>
        </ThemeProvider>
    )
}

export default Choice
