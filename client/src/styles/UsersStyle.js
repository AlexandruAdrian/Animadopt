import colors from './colors';
import settingsStyle from './SettingsStyle';

const style = {
  container: {
    ...settingsStyle.container,
    margin: '0 auto',
    '@media (min-width: 500px)': {
      maxWidth: '500px',
    },
    '@media (min-width: 960px)': {
      maxWidth: '1000px',
    },
  },

  card: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 15px 20px',
  },
  inputRoot: {
    fontSize: '14px',
    color: colors.darkPacificBlue,
  },
  icon: {
    color: 'grey',
  },
  searchControl: {
    width: '100%',
    maxWidth: '600px',
  },
};

export default style;
