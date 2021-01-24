import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';
import { roRO } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.darkPacificBlue,
    },
  },
  typography: {
    fontFamily: `"Rubik", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
