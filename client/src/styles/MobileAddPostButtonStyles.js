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
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: '9999',
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
      width: '200px',
      height: 'auto',
      padding: '8px 0',
      margin: '10px auto',
      borderRadius: '5px',
      '& > svg': {
        fontSize: '23px',
        marginRight: '3px',
      },
      '& > p': {
        display: 'block',
        fontSize: '14px',
      },
    },
  },
};

export default styles;
