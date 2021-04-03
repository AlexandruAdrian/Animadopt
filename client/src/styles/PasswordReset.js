import colors from './colors';
import registerFormStyles from './RegisterFormStyles';
import accountRecoveryStyles from './AccountRecoveryStyle';
import logo from '../assets/logo.png';

const style = {
  container: {
    ...accountRecoveryStyles.container,
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.white,
    borderRadius: '5px',
    width: '100%',
    maxWidth: '450px',
    height: '370px',
  },
  logoWrapper: {
    width: '100%',
    height: '50px',
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    height: '100%',
    width: '100%',
  },
  formContainer: {
    width: '90%',
    height: '100%',
    padding: '50px 0 20px 0',
  },
  form: {
    display: 'flex',
    marginTop: '30px',
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
    padding: '0 5px',
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
