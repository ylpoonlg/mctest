import { Typography, Grid, Button } from '@material-ui/core'
import { React, useState } from 'react'
import { useHistory } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';

import Content from '../Layout/Content'
import Timer from '../Timer/Timer';
import Choice from './Choice'
import Slidebar from './Slidebar';

import './test.css';

function TestPage() {
    const history = useHistory();

    // Init
    let initCurq = JSON.parse(sessionStorage.mc_test_state).curq;
    let initQdata = JSON.parse(sessionStorage.mc_qdata);
    let initChoice = initQdata["q"+initCurq].ans;
    
    // State
    const [choice, setchoice] = useState(initChoice);
    const [curq, setCurq] = useState(JSON.parse(sessionStorage.mc_test_state).curq);
    const [nextQ, setNextQ] = useState(0);
    const [prevQ, setPrevQ] = useState(0);
    const [refresh, setRefresh] = useState(0);

    function onCurQChange(newVal) {
        let qdata = JSON.parse(sessionStorage.mc_qdata);
        setCurq(newVal);
        setchoice(qdata["q"+newVal].ans);
    }

    // Choices
    function selectChoice(c) {
        console.log("selected "+c);

        let qdata = JSON.parse(sessionStorage.mc_qdata);
        let testState = JSON.parse(sessionStorage.mc_test_state);
        let curq = testState.curq;
        if (c === choice) {
            setchoice(" ");
            qdata["q"+curq].ans = "";
        } else {
            setchoice(c);
            qdata["q"+curq].ans = c;

            // auto next q
            if (JSON.parse(localStorage.mc_settings).auto_next_q)
                setNextQ(nextQ+1);
        }

        sessionStorage.mc_qdata = JSON.stringify(qdata);
    }

    document.onkeydown = (e) => {
        let key = e.key;
        let upKey = key.toUpperCase();
        var maxChar = String.fromCharCode(64+JSON.parse(sessionStorage.mc_qdata).numc);

        if (key == "ArrowLeft") {
            setPrevQ(prevQ+1);
        } else if (key == "ArrowRight") {
            setNextQ(nextQ+1);
        } else if (key.length==1 && (upKey>="A"&&upKey<=maxChar)) {
            selectChoice(upKey);
        } else if (key == " ") {
            selectChoice("");
        }
    }

    function onDeleteCurQ(e) {
        let qdata = JSON.parse(sessionStorage.mc_qdata);
        let testState = JSON.parse(sessionStorage.mc_test_state);
        let numq = qdata.numq;
        let curq = testState.curq;
        if (curq == 1 && numq == 1) return;

        qdata["ttime"] -= qdata["q"+curq]["time"];
        for (var i=curq; i<numq; i++) {
        qdata["q"+i] = qdata["q"+(i+1)];
        }
        if (curq == numq) {
            curq--;
            testState.curq = curq;
            sessionStorage.mc_test_state = JSON.stringify(testState);
        }
        //delete qdata["q"+numq];
        qdata["numq"]--;
        sessionStorage.mc_qdata = JSON.stringify(qdata);
        onCurQChange(curq);
        setRefresh(refresh+1);
    }

    function finish() {
        history.replace('/result');
    }
    
    // Generate Choice Buttons
    var choiceList = [];
    const numc = JSON.parse(sessionStorage.mc_qdata).numc;
    for (var i=0; i<numc; i++) {
        const c = String.fromCharCode(65+i);
        choiceList.push((
            <Choice val={c} key={"choice-"+c} isSelected={c === choice} selectChoice={selectChoice}/>
        ));
    }

    return (<>
        <Slidebar refresh={refresh} prevQ={prevQ} nextQ={nextQ} onChange={onCurQChange} />
        <Content mt={0.5}>
            <Timer />

            <div id="answer-sheet">
                <div className="row">
                    <button className="control-btn" onClick={onDeleteCurQ}
                        style={{marginRight: "0.5rem"}}><DeleteIcon /></button>
                    <Typography id="curq" variant="h4">Question {curq}</Typography>
                </div>
                <Grid className="choices" container justify="space-around" direction="row">
                    {choiceList}
                </Grid>
            </div>
            <Button id="finish-btn" variant="contained" onClick={finish} color="secondary">Finish</Button>
        </Content>
    </>)
}

export default TestPage