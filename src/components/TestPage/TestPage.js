import { Typography, Grid, makeStyles, Button } from '@material-ui/core'
import { React, useState } from 'react'
import { useHistory } from 'react-router';
import Content from '../Layout/Content'
import Choice from './Choice'

const styles = makeStyles((theme) => ({
    choices: {
        minHeight: "20rem",
        alignItems: "center",
    },
    finishBtn: {
        width: "6rem",
        color: theme.palette.text.light,
    }
}));

function TestPage() {
    const classes = styles();
    const history = useHistory();

    console.log("TestPage: numc = "+sessionStorage.mc_numc);

    // State
    const [choice, setchoice] = useState(" ");

    function selectChoice(c) {
        console.log("selected "+c);
        if (c === choice) {
            setchoice(" ");
        } else {
            setchoice(c);
        }
    }

    function finish() {
        history.replace('/finish');
    }

    var choiceList = [];
    const numc = sessionStorage.mc_numc;
    for (var i=0; i<numc; i++) {
        const c = String.fromCharCode(65+i);
        choiceList.push((
            <Choice val={c} key={"choice-"+c} isSelected={c === choice} selectChoice={selectChoice}/>
        ));
    }
    return (
        <Content>
            <Typography variant="h4">Testing</Typography>
            <Typography></Typography>
            <Grid className={classes.choices} container justify="space-around" direction="row">
                {choiceList}
            </Grid>

            <Button variant="contained" className={classes.finishBtn} onClick={finish} color="secondary">Finish</Button>
        </Content>
    )
}

export default TestPage
