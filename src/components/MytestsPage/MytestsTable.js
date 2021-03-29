import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles, Table, Button,
  TableBody, TableCell, TableContainer, TablePagination,
  TableHead, TableRow } from '@material-ui/core';
import PropagateLoader from 'react-spinners/PropagateLoader';
import DeleteIcon from '@material-ui/icons/Delete';

import * as db from '../../firebase/db';
import './mytests.css';
import MytestsFilter from './MytestsFilter';

const styles = makeStyles((theme) => ({
  cell: {
    border: "none",
  },
  actionBtn: {
    padding: "0",
    background: "none",
    border: "none",
    color: "#555",
    "&:hover": {
      color: "#999",
    }
  },
}));

function MytestsTable(props) {
  const classes = styles();
  const history = useHistory();

  const NUM_COL = 3;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [RPP, setRPP] = useState(100); // Rows Per Page
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});
  const [data, setData] = useState(null);
  getTests(); // Load from database

  /*tdata format: {"numt": 3, "t1": {...}, "t2": {...}, "t3": {...}}*/
  function getTests() {
    if (loading) {
      db.getMytests((tdata) => {
        if (tdata == null) {
          setLoading(false);
          setRows([(
            <TableRow key="failed">
              <TableCell className={classes.cell} colSpan={NUM_COL}>Failed to load tests.</TableCell>
            </TableRow>
          ),(
            <TableRow key="try">
              <TableCell className={classes.cell} colSpan={NUM_COL}>
                (Try logging in again)
              </TableCell>
            </TableRow>
          )]);
        } else {
          //console.log("tdata: "+JSON.stringify(tdata));
          setData(tdata);
          setLoading(false);
          setRows(getRows(tdata));
        }
      });
    }
  }

  function getRows(tdata) {
    let items = [];
    for (var i=1; i<=tdata.numt; i++) {
      let index = i;
      let qdata = tdata["t"+i];
      let test_name = qdata.test_name;

      if (test_name.indexOf(filters.subject)>-1 && test_name.indexOf(filters.paper)>-1) {
        let scorePercent = Math.round(qdata.score / qdata.numq * 100);
        items.push((
          <TableRow key={i}>
            <TableCell className={classes.cell}>
              <a className="test-link" onClick={(e) => {selectTest(index)}} title="Result">{qdata.test_name}</a>
            </TableCell>
            <TableCell className={classes.cell}>{qdata.score}/{qdata.numq} [{scorePercent}%]</TableCell>
            <TableCell className={classes.cell}>
              <button className={classes.actionBtn} title="Delete"
                onClick={(e) => {
                  deleteTest(index);
                }}>
                <DeleteIcon style={{fontSize: "1.2rem"}} />
              </button>
            </TableCell>
          </TableRow>
        ));
      }
    }
    function selectTest(index) {
      // Load qdata to sessionStorage
      let qdata = tdata["t"+index];
      sessionStorage.mc_qdata = JSON.stringify(qdata);
      history.replace("/result");
    }
    function deleteTest(index) {
      let qdata = tdata["t"+index];
      let result = window.confirm(`Do you really want to delete ${qdata.test_name}?`);
      if (result) {
        db.deleteTest(qdata.test_name, (success) => {
          if (success) {
            history.go(0);
          } else {
            window.alert(`Failed to delete ${qdata.test_name}.`);
          }
        });
      }
    }

    return items;
  }

  useEffect(() => {
    if (data != null) {
      setRows(getRows(data));
    }
  }, [filters]);

  return (
    <div style={props.style}>
      <TableContainer id="mytests-table">
        <Table size="small" style={{ widgth: "100%" }}>
          <TableHead style={{background: "#ccc"}}>
            {/* Header: Filter&Sorting */}
            <TableRow>
              <TableCell className={classes.cell} colSpan={NUM_COL}>
                <MytestsFilter onChange={(val) => {
                  console.log("Filter update: "+JSON.stringify(val));
                  setFilters(val);
                }} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.cell}>Test</TableCell>
              <TableCell className={classes.cell}>Score</TableCell>
              <TableCell className={classes.cell}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading?
            <TableRow style={{height: "3rem"}}>
              <TableCell className={classes.cell} colSpan={NUM_COL}>
                <div className="row" style={{ paddingBottom: "1rem" }}>
                  <PropagateLoader loading={loading} />
                </div>
              </TableCell>
            </TableRow>
            :<></>}

            {rows.slice(page*RPP, page*RPP+RPP)
              .map((test, index) => {
                return test;
              }
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
            setRPP(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </div>
  )
}

export default MytestsTable
