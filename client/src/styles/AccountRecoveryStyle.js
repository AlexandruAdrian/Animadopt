import colors from './colors';
import registerFormStyles from './RegisterFormStyles';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.pacificBlue,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '25px 10px 15px',
    width: '100%',
    maxWidth: '350px',
    borderRadius: '5px',
    background: colors.white,
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '300px',
    '& button': {
      margin: '25px auto 0 auto',
      maxWidth: '250px',
    },
  },
  formControl: {
    maxWidth: '250px',
    margin: '0 auto',
  },
  inputRoot: {
    ...registerFormStyles.inputRoot,
  },
  inputLabelRoot: {
    ...registerFormStyles.inputLabelRoot,
  },
  adornment: {
    ...registerFormStyles.adornment,
  },
  error: {
    fontSize: '14px',
    minHeight: '20px',
    width: '100%',
    minWidth: '300px',
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default style;
