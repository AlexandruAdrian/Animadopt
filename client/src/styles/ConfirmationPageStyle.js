import colors from './colors';

const style = {
  confirmationContainer: {
    width: '100%',
    height: '100%',
    backgroundImage: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    width: '100%',
    maxWidth: '700px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: '5px',
    minHeight: '250px',
    padding: '10px',
    color: colors.darkPacificBlue,
    '& a': {
      textDecoration: 'none',
      color: colors.pacificBlue,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& h1': {
      fontSize: '14px',
      textAlign: 'center',
    },
  },
};

export default style;
