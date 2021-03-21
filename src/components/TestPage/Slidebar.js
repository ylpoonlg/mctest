import { forwardRef, React, useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import './sliderbar.css';

function Slidebar(props) {
    const [curq, setcurq] = useState(JSON.parse(sessionStorage.mc_test_state).curq);
    const [numq, setnumq] = useState(JSON.parse(sessionStorage.mc_qdata).numq);

    function onSliderChange(e, val) {
        onChangeCurQ(val);
    }

    function onPrev(e) {
        let curq = JSON.parse(sessionStorage.mc_test_state).curq;
        onChangeCurQ(--curq);
    }
    function onNext(e) {
        let curq = JSON.parse(sessionStorage.mc_test_state).curq;
        onChangeCurQ(++curq);
    }

    function onChangeCurQ(newVal) {
        let qdata = JSON.parse(sessionStorage.mc_qdata);
        newVal = Math.max(1, newVal);
        if (newVal > qdata.numq) { // Add new question
            qdata.numq++;
            setnumq(qdata.numq);
            newVal = qdata.numq;
            qdata["q"+newVal] = {ans: "", time: 0};
            sessionStorage.mc_qdata = JSON.stringify(qdata);
        }
        let testState = JSON.parse(sessionStorage.mc_test_state);
        testState.curq = newVal;
        sessionStorage.mc_test_state = JSON.stringify(testState);
        setcurq(newVal);
        props.onChange(newVal);
    }

    useEffect(() => {
        if (props.nextQ > 0) onNext();
    }, [props.nextQ]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
            <button className="nav-btn" onClick={onPrev}><NavigateBeforeIcon /></button>
            <Slider className="slider" onChange={onSliderChange}
                value={curq}
                min={1} step={1} max={numq} defaultValue={JSON.parse(sessionStorage.mc_test_state).curq}
                valueLabelDisplay="off" marks track={false}>
            </Slider>
            <button className="nav-btn" onClick={onNext}><NavigateNextIcon /></button>
        </div>
    )
}

export default Slidebar;
