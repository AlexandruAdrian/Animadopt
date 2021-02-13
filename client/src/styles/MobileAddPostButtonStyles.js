import colors from './colors';

const styles = {
  button: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: colors.darkPacificBlue,
    cursor: 'pointer',
    color: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    '& > svg': {
      fontSize: '28px',
    },
    '& > p': {
      display: 'none',
    },
    '@media (min-width: 500px)': {
      position: 'static',
      fontSize: '14px',
      textDecoration: 'none',
      width: '135px',
      height: 'auto',
      padding: '8px 0',
      margin: '10px auto 0 auto',
      borderRadius: '5px',
      '& > p': {
        display: 'block',
      },
    },
  },
};

export default styles;
