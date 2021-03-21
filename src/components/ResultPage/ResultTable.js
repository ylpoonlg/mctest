import { Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

function ResultTable(props) {
    return (
        <div>
          <TableContainer>
            <Table id="result-table" className="table"
                size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Score: {props.score}</TableCell>
                  <TableCell>Total Time: {props.ttime}</TableCell>
                </TableRow>
              </TableHead>

              <TableRow>
                <TableCell>{1}</TableCell>
                <TableCell>A</TableCell>
                <TableCell>A</TableCell>
                <TableCell>00:00:00.00</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
    )
}

export default ResultTable
