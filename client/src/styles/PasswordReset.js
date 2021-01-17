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
    ...accountRecoveryStyles.formWrapper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    '& button': {
      width: '100%',
      maxWidth: '270px',
      marginTop: '15px',
    },
  },
  formControl: {
    ...accountRecoveryStyles.formControl,
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
  success: {
    color: colors.darkPacificBlue,
    fontSize: '14px',
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      fontWeight: '600',
      color: colors.darkPacificBlue,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
};

export default style;
