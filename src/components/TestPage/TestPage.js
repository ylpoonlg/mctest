import { Typography, Grid, makeStyles, Button, IconButton } from '@material-ui/core'
import { React, useState } from 'react'
import { useHistory } from 'react-router';

import Content from '../Layout/Content'
import Timer from '../Timer/Timer';
import Choice from './Choice'
import Slidebar from './Slidebar';

import './test.css';

function TestPage() {
    const history = useHistory();

    // State
    const [choice, setchoice] = useState("");
    const [curq, setCurq] = useState(JSON.parse(sessionStorage.mc_test_state).curq);

    function onCurQChange(newVal) {
        let qdata = JSON.parse(sessionStorage.mc_qdata);
        setCurq(newVal);
        setchoice(qdata["q"+newVal].ans);
    }

    // Choices
    function selectChoice(c) {
        console.log("selected "+c);

        let qdata = JSON.parse(sessionStorage.mc_qdata);
        let curq = JSON.parse(sessionStorage.mc_test_state).curq;
        if (c === choice) {
            setchoice(" ");
            qdata["q"+curq].ans = "";
        } else {
            setchoice(c);
            qdata["q"+curq].ans = c;
        }

        sessionStorage.mc_qdata = JSON.stringify(qdata);
    }
    
    var choiceList = [];
    const numc = JSON.parse(sessionStorage.mc_qdata).numc;
    for (var i=0; i<numc; i++) {
        const c = String.fromCharCode(65+i);
        choiceList.push((
            <Choice val={c} key={"choice-"+c} isSelected={c === choice} selectChoice={selectChoice}/>
        ));
    }

    function finish() {
        history.replace('/result');
    }
    return (<>
        <Slidebar onChange={onCurQChange} />
        <Content mt={0.5}>
            <Timer />

            <div id="answer-sheet">
                <Typography id="curq" variant="h4">Question {curq}</Typography>
                <Grid className="choices" container justify="space-around" direction="row">
                    {choiceList}
                </Grid>
            </div>
            <Button id="finish-btn" variant="contained" onClick={finish} color="secondary">Finish</Button>
        </Content>
    </>)
}

export default TestPage