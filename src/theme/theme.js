import { createMuiTheme, useTheme } from '@material-ui/core';
import colors from './colors';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.primary.main,
        dark: colors.primary.dark,
        light: colors.primary.light,
      },
      secondary: {
        main: colors.secondary.main,
        dark: colors.secondary.dark,
        light: colors.secondary.light,
      },
      text: {
        main: colors.text.main,
        dark: colors.text.dark,
        light: colors.text.light,
      },
      contentBackground: "#ffffff",
    },
    typography: {
        fontFamily: '"Rubik", "Roboto", "Arial"',
        button: {
            textTransform: "none"
        }
    },
    breakpoints: {
      values: {
        sm: 625,
      }
    }
  });

export default theme