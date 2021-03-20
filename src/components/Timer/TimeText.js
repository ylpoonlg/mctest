import { Typography, Grid } from '@material-ui/core';
import React from 'react'

function TimeText(props) {

    function addZero(num, digits) {
        var result = "";
        for (var i=0; i<digits; i++) {
            result += "0";
        }
        result += num.toString();
        return result.substr(result.length - digits);
    }

    function format(milseconds) {
        milseconds = parseInt(milseconds);
        let hours = Math.floor(milseconds / (1000*60*60));
        let minutes = Math.floor((milseconds - hours*(1000*60*60)) / (1000*60));
        let seconds = Math.floor((milseconds - hours*(1000*60*60) - minutes*(1000*60)) / (1000));
        let dseconds = Math.floor(milseconds % 1000 / 10);
        let time = addZero(hours, 2) + ":" + addZero(minutes, 2) + ":" + addZero(seconds, 2);
        if (props.dp == "true") time += "." + addZero(dseconds, 2);
        return time.toString();
    }

    return (
        <Grid item style={{ padding: "0 0.5rem" }}>
            <Typography style={{fontFamily: "Share Tech Mono, monospace"}} {...props}>
                {props.label}
                {format(props.time ? props.time : 0)}
            </Typography>
        </Grid>
    )
}

export default TimeText
