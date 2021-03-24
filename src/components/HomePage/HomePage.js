import { useState, useEffect } from 'react';
import { Switch, Button, Grid, createMuiTheme, makeStyles, TextField, Typography, ThemeProvider, FormGroup, FormControlLabel, useMediaQuery, Collapse } from "@material-ui/core";
import { useHistory } from "react-router";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// Components
import Content from "../Layout/Content";

// Styles
import theme from '../../theme/theme';
import './settings.css';

const styles = makeStyles((theme) => ({
  startBtn: {
    background: 'linear-gradient(45deg, #ff5900 30%, #ffbb00 90%)',
    width: "12em",
    height: "2em",
    borderRadius: "2.5em",
    fontSize: "2em",
    color: theme.palette.text.light,
    margin: theme.spacing(4),
    "&:hover": {
      boxShadow: "#5599ff 0 0 10px",
    },
  },
  startBtnM: {
    width:"6em",
  }
}));

const settingsTheme = createMuiTheme({
  palette: {
      primary: {
          main: "#0088ff",
          dark: "#0052a3",
          light: "#69b1ff"
      },
      text: {
          main: "#4a4a4a"
      }
  }
});

function HomePage() {
  const classes = styles();
  const history = useHistory();
  const initSettings = JSON.parse(localStorage.mc_settings);
  
  // States
  const [settingsSection, setSettingsSection] = useState(initSettings.settingsSection);

  const [numChoice, setnumChoice] = useState(4);
  const [autoNextQ, setAutoNextQ] = useState(initSettings.auto_next_q);
  const [numcError, setnumcError] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  // Handler
  function startTestClick(e) {
    console.log("Start Test: numc = "+numChoice);
    if (numChoice < 1 || numChoice > 10) {
      setnumcError(true);
    } else {
      setnumcError(false);

      // Create New Test
      let qdata = {
        test_name: "test-123",
        score: 0,
        numq: 1,
        numc: numChoice,
        ttime: 0,
        q1: {
          ans: "",
          ms: "",
          time: 0,
        },
      }

      resetStates();
      sessionStorage.mc_qdata = JSON.stringify(qdata);
      history.replace("/test");
    }
  }

  function toggleSettings(e) {
    const newVal = !settingsSection;

    const settings = JSON.parse(localStorage.mc_settings);
    settings.settingsSection = newVal;
    localStorage.mc_settings = JSON.stringify(settings);

    setSettingsSection(newVal);
  }
  
  function toggleAutoNextQ(e) {
    const settings = JSON.parse(localStorage.mc_settings);
    settings.auto_next_q = !autoNextQ;
    localStorage.mc_settings = JSON.stringify(settings);

	  setAutoNextQ(!autoNextQ);
  }

  function inputNumChoice(e) {
    const val = e.target.value;
    setnumChoice(val);
  }

  return (
    <Content>
      <div>
      <Typography variant="h4" >Start New Test</Typography>
        <Button
          className={[classes.startBtn, isMobile?classes.startBtnM:null].join(' ')}
          onClick={startTestClick}
        >START</Button>
      </div>

      {/* Settings */}
      <Button onClick={toggleSettings} disableRipple>
        {settingsSection ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography variant="h5" style={{paddingLeft: "0.5rem"}}>Settings</Typography>
      </Button>
      <ThemeProvider theme={settingsTheme}>

        <Collapse in={settingsSection} timeout={150}>
          <div style={{ padding: "1rem",
            margin: "auto",
            width: "60%",
            maxWidth: "30rem",
            borderTop: "solid #999 1.2px",
          }}>
            <div>
              <div className="settings-item settings-textfield">
                <TextField type="number" value={numChoice} onChange={inputNumChoice}
                  error={numcError} helperText={numcError?"Accepted range: 1-10.":""}
                  variant="outlined" color="primary" label="Number of Choices"/>
              </div>
              <div className="settings-item settings-switch">
                <FormControlLabel className="settings-item settings-switch"
                  control={<Switch checked={autoNextQ} onChange={toggleAutoNextQ} color="primary" />}
                  label="Go to next question automatically" labelPlacement="start"/>
              </div>
            </div>
          </div>
        </Collapse>
        

      </ThemeProvider>
    </Content>
  );
}


export default HomePage;

function resetStates() {
  let nowtime = Date.now();
  let testState = {
      curq: 1,
      ispaused: false,
      sttime: nowtime,
      patime: 0,
  }
  sessionStorage.mc_test_state = JSON.stringify(testState);
}