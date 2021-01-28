import colors from './colors';

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    padding: '15px',
    height: '270px',
    width: '95%',
    maxWidth: '500px',
    outline: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '300px',
    margin: '0 auto',
    justifyContent: 'space-between',
    height: '100%',
    '& > div > div:not(:first-child)': {
      marginTop: '15px',
    },
    '& > button': {
      width: '100%',
    },
  },
  datePicker: {
    fontSize: '14px',
    color: colors.darkPacificBlue,
  },
  inputRoot: {
    fontSize: '14px',
    color: colors.darkPacificBlue,
  },
};

export default styles;
