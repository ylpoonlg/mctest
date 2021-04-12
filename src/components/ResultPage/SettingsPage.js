import { Button, ButtonGroup, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router';
import colors from '../../theme/colors';
import Content from '../Layout/Content'

const styles = makeStyles((theme) => ({
    options: {
        marginTop: "1rem",
        minHeight: "15rem",
    },
    confirmBtn: {
        color: "#fff",
        background: colors.secondary.main,
        "&:hover": {
            background: colors.secondary.dark,
        },
        "&:active": {
            background: colors.secondary.light,
        },
    },
}));

function SettingsPage() {
    const classes = styles();
    const history = useHistory();

    function handleConfirm(e) {
        console.log("Saving settings...");
        history.goBack();
    }

    function handleCancel(e) {
        history.goBack();
    }

    return (
        <Content>
            <Typography variant="h4">Test Settings</Typography>
            <div className={classes.options}>
                <p>// TODO</p>
            </div>
            <div className="row">
                <ButtonGroup>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" className={classes.confirmBtn} onClick={handleConfirm}>Confirm</Button>
                </ButtonGroup>
            </div>
        </Content>
    )
}

export default SettingsPage
