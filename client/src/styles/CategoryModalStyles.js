import colors from './colors';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: colors.white,
    width: '98%',
    height: '200px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    outline: 0,
    borderRadius: '5px',
    marginTop: '200px',
    '@media (min-width: 500px)': {
      maxWidth: '455px',
    },
  },
  inputRoot: {
    fontSize: '14px',
  },
  modalControls: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    '& button': {
      width: '100%',
      margin: '0 2px',
    },
  },
};

export default styles;
