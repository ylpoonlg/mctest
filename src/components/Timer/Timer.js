import * as React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import TimeText from './TimeText';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ttime: 0,
            qtime: 0,
            isTimerPaused: JSON.parse(sessionStorage.mc_test_state).ispaused,
        };

        this.timerTick = this.timerTick.bind(this);
        this.toggleTimerPause = this.toggleTimerPause.bind(this);

        const TIMER_INTERVAL = 10;
        this.globalTimer = setInterval(this.timerTick, TIMER_INTERVAL);
    }

    componentWillUnmount() {
        console.log("Timer unmounted");
        clearInterval(this.globalTimer);
    }

    timerTick() {
        // save into sessionStorage
        let qdata = calQdata();
        let curq = 1; // get curq from sessionStorage

        let prev = this.state;
        prev.ttime = qdata["ttime"];
        prev.qtime = qdata["q"+curq]["time"];
        this.setState(prev);
    }

    toggleTimerPause(e) {
        const newVal = !this.state.isTimerPaused;
        // update display state
        let prev = this.state;
        prev.isTimerPaused = newVal;
        this.setState(prev);

        // update testState
        let testState = JSON.parse(sessionStorage.mc_test_state);
        let nowtime = Date.now();
        testState.ispaused = newVal;
        if (newVal) { // Pause now
            testState.patime = nowtime;
        } else {    // Resume now
            testState.sttime += nowtime - testState.patime;
        }
        sessionStorage.mc_test_state = JSON.stringify(testState);
    }

    render () {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{ margin: "0 -0.5rem" }}>
                <button className="control-btn" onClick={this.toggleTimerPause}>
                    {this.state.isTimerPaused ?
                        <PlayCircleFilledIcon />
                        :<PauseCircleFilledIcon /> 
                    }
                </button>
                <TimeText dp="true" variant="h5" time={this.state.ttime} label="Total Time: "/>
                <TimeText dp="true" variant="h5" time={this.state.qtime} label="Question Time: "/>
            </Grid>
        );
    }
}

export default Timer

/* sessionStorage data: {
    mc_qdata: {
        ...
    },
    mc_test_state: {
        curq: int,
        ispaused: bool,
        sttime: int,
        patime: int,
    }
}*/

function calQdata() {
    let testState = JSON.parse(sessionStorage.mc_test_state);

    let curq = parseInt(testState.curq);
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    let nowtime = Date.now();
    if (testState.ispaused) {
        return qdata;
    }
    
    qdata["q"+curq]["time"] += nowtime - testState.sttime;
    qdata["ttime"] += nowtime - testState.sttime;
    testState.sttime = nowtime;
    sessionStorage.mc_test_state = JSON.stringify(testState);
    sessionStorage.mc_qdata = JSON.stringify(qdata);
    return qdata;
}