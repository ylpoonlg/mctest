import { Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

import './result.css';

function ResultTable(props) {
    return (
        <div style={props.style}>
          <TableContainer>
            <Table id="result-table" className="table"
                size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="header" colSpan={2}>Score: {props.score}</TableCell>
                  <TableCell className="header" colSpan={2}>Total Time: {props.ttime}</TableCell>
                </TableRow>
              </TableHead>

              <TableRow>
                <TableCell style={{width: "20%"}}>Question</TableCell>
                <TableCell style={{width: "20%"}}>Your Answer</TableCell>
                <TableCell style={{width: "20%"}}>Correct Answer</TableCell>
                <TableCell style={{width: "40%"}}>Time Used</TableCell>
              </TableRow>

            </Table>
          </TableContainer>
        </div>
    )
}

export default ResultTable
