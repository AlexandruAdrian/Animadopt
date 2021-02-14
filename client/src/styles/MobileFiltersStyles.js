import colors from './colors';

const styles = {
  summary: {
    '& > div': {
      color: colors.darkPacificBlue,
      display: 'flex',
      alignItems: 'center',
    },
    '& > div > svg:first-child': {
      marginRight: '5px',
      fontSize: '20px',
    },
    '& > div > p': {
      fontSize: '14px',
      paddingTop: '1px',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:first-child': {
      marginBottom: '20px',
    },
  },
};

export default styles;
