import { useState, useEffect } from 'react';
import { Switch, Button, Grid, createMuiTheme, makeStyles, TextField, Typography, ThemeProvider, FormGroup, FormControlLabel, useMediaQuery, Collapse } from "@material-ui/core";
import { useHistory } from "react-router";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import Content from "../Layout/Content";

import McSettings from "./settings";
import theme from '../../theme/theme';
import { SettingsSystemDaydreamOutlined } from '@material-ui/icons';

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
    fontSize: "2rem",
    background: 'linear-gradient(45deg, #ff5900 30%, #ffbb00 90%)',
    width:"6em",
    height: "2em",
    borderRadius: "2.5em",
    color: theme.palette.text.light,
    margin: theme.spacing(4),
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
  const mcSetter = new McSettings();
  
  // States
  const [settingsDd, setSettingsDd] = useState(mcSetter.getSetting("settings_dd"));
  const [showDd, setShowDd] = useState(mcSetter.getSetting("settings_dd"));

  const [numChoice, setnumChoice] = useState(4);
  const [autoNextQ, setAutoNextQ] = useState(mcSetter.getSetting("auto_next_q"));
  const [numcError, setnumcError] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  // Handler
  function startTestClick(e) {
    console.log("Start Test: numc = "+numChoice);
    if (numChoice < 1 || numChoice > 10) {
      setnumcError(true);
    } else {
      setnumcError(false);
      sessionStorage.mc_numc = numChoice;
      history.replace("/test");
    }
  }

  const SHOW_SETTINGS_DUR = 200;
  function toggleSettings(e) {
    const newSettingsDd = !settingsDd;
    mcSetter.setSettings("settings_dd", newSettingsDd);
    console.log('settingsDd '+newSettingsDd);
    if (!newSettingsDd) {
      setTimeout(() => {
        setShowDd(newSettingsDd);
      }, SHOW_SETTINGS_DUR);
    } else {
      setShowDd(newSettingsDd);
    }
    setSettingsDd(newSettingsDd);
  }
  
  function toggleAutoNextQ(e) {
    mcSetter.setSettings("auto_next_q", !autoNextQ);
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
          className={isMobile?classes.startBtnM:classes.startBtn}
          onClick={startTestClick}
        >START</Button>
      </div>

      {/* Settings */}
      <Button onClick={toggleSettings} disableRipple>
        {settingsDd ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        <Typography variant="h5" style={{paddingLeft: "0.5rem"}}>Settings</Typography>
      </Button>
      <ThemeProvider theme={settingsTheme}>

        <Collapse in={settingsDd} timeout={SHOW_SETTINGS_DUR}>
          <div style={{ padding: "1rem",
            display: showDd ? "block" : "none",
            margin: "auto",
            width: "60%",
            maxWidth: "20rem",
          }}>
            <FormGroup>
              <TextField error={numcError} helperText={numcError?"Accepted range: 1-10.":""}
                type="number" value={numChoice} onChange={inputNumChoice}
                variant="outlined" label="Number of Choices" color="primary" />
              <FormControlLabel
                control={
                  <Switch checked={autoNextQ} onChange={toggleAutoNextQ} name="checkedA" color="primary" />
                }
                label="Go to next question automatically"
                labelPlacement="start"
                />
            </FormGroup>
          </div>
        </Collapse>
        

      </ThemeProvider>
    </Content>
  );
}


export default HomePage;