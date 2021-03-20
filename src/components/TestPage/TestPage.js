import { Typography, Grid, makeStyles, Button, IconButton } from '@material-ui/core'
import { React, useState } from 'react'
import { useHistory } from 'react-router';

import Content from '../Layout/Content'
import Timer from '../Timer/Timer';
import Choice from './Choice'

import './test.css';

function TestPage() {
    const history = useHistory();

    // State
    const [choice, setchoice] = useState(" ");
    const [curq, setCurq] = useState(1);

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

    // Choices
    var choiceList = [];
    const numc = JSON.parse(sessionStorage.mc_qdata).numc;
    for (var i=0; i<numc; i++) {
        const c = String.fromCharCode(65+i);
        choiceList.push((
            <Choice val={c} key={"choice-"+c} isSelected={c === choice} selectChoice={selectChoice}/>
        ));
    }
    return (
        <Content>
            <Timer />

            <div id="answer-sheet">
                <Typography id="curq" variant="h4">Question {curq}</Typography>
                <Grid className="choices" container justify="space-around" direction="row">
                    {choiceList}
                </Grid>
            </div>
            <Button id="finish-btn" variant="contained" onClick={finish} color="secondary">Finish</Button>
        </Content>
    )
}

export default TestPage