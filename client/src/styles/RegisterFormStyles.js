import colors from './colors';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    maxHeight: '350px',
  },
  inputBox: {
    display: 'flex',
    marginTop: '5px',
    justifyContent: 'space-between',
    '& > div': {
      width: '47%',
    },
    '@media (min-width: 1024px)': {
      marginTop: '10px',
    },
  },
  inputRoot: {
    fontSize: '14px',
    marginTop: '5px',
    '@media (min-width: 1024px)': {
      marginTop: '10px',
    },
  },
  genderBox: {
    marginTop: '15px',
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputLabelRoot: {
    fontSize: '14px',
    color: 'gray',
  },
  adornment: {
    color: 'gray',
    cursor: 'pointer',
  },
  genderError: {
    fontSize: '12px',
    color: 'rgb(244, 67, 54)',
  },
  stepTwo: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '25px',
    color: colors.darkPacificBlue,
    '& p': {
      fontSize: '14px',
      textAlign: 'center',
    },
  },
};

export default styles;
