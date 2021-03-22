import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, makeStyles, Button } from '@material-ui/core'
import React, { useState } from 'react'
import colors from '../../theme/colors';
import TimeText from '../Timer/TimeText';

import './result.css';

const styles = makeStyles((theme) => ({
  cell: {
    maxHeight: "1rem",
    padding: "0 1rem",
  }
}));

function ResultTable(props) {
  const classes = styles();
  const qdata = JSON.parse(sessionStorage.mc_qdata);
  const ttime = qdata.ttime;
  
  // States
  let score = 0;
  const [page, setPage] = useState(0);
  const [RPP, setRPP] = useState(100); // Rows Per Page

  // Get row Data
  function getResult() {
    let ret = [];
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    let numq = qdata.numq;
    let scr = 0;
  
    for (var i=1; i<=numq; i++) {
      ret.push({
        ans: qdata["q"+i].ans,
        ms: qdata["q"+i].ms,
        time: qdata["q"+i].time,
      });
      scr += (qdata["q"+i].ans === qdata["q"+i].ms) ? 1 : 0;
    }
    score = scr;
    return ret;
  }

  const rows = getResult();

  return (
      <div style={props.style}>
        <TableContainer id="result-table">
          <Table className="table"
              size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}
                  style={{fontFamily: "Share Tech Mono, monospace", fontSize: "100%"}}
                >Score: {score}/{qdata.numq}</TableCell>
                <TableCell colSpan={2}>
                  <TimeText label="Total Time Used: " time={ttime} dp="true" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{width: "25%"}}>Question</TableCell>
                <TableCell style={{width: "25%"}}>Your Answer</TableCell>
                <TableCell style={{width: "25%"}}>Correct Answer</TableCell>
                <TableCell style={{width: "25%"}}>Time Used</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.slice(page*RPP, page*RPP+RPP)
                .map((question, index) => {
                let ansColor = colors.answer.default;
                if (question.ms != " " && question.ms) {
                  ansColor = (question.ans === question.ms)?colors.answer.correct:colors.answer.wrong;
                }
                return (
                <TableRow key={"result-q"+index}>
                  <TableCell className={classes.cell}>{index + page*RPP + 1}</TableCell>
                  <TableCell className={classes.cell}
                    style={{ background: ansColor }}
                  >{question.ans}</TableCell>
                  <TableCell className={classes.cell}>{question.ms}</TableCell>
                  <TableCell className={classes.cell}><TimeText dp="true" time={question.time}/></TableCell>
                </TableRow>
                )}
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={RPP}
            page={page}
            onChangePage={(e, val) => {setPage(val)}}
            onChangeRowsPerPage={(e) => {
              console.log("event "+e.target.value);
              setRPP(parseInt(e.target.value, 10));
              setPage(0);
            }}
            />
          </TableContainer>
      </div>
  )
}

export default ResultTable