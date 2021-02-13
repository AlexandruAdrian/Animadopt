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
};

export default style;
