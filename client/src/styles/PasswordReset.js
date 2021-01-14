import colors from './colors';
import registerFormStyles from './RegisterFormStyles';
import accountRecoveryStyles from './AccountRecoveryStyle';

const style = {
  container: {
    ...accountRecoveryStyles.container,
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.white,
    borderRadius: '5px',
    width: '100%',
    maxWidth: '450px',
    height: '300px',
    padding: '25px 20px 15px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    ...accountRecoveryStyles.form,
    '& > div:nth-child(2)': {
      marginTop: '10px',
    },
  },
  formControl: {
    width: '200px',
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
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default style;
