import colors from './colors';
import registerFormStyles from './RegisterFormStyles';
import loginStyle from './LoginStyle';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100%',
    backgroundColor: colors.darkPacificBlue,
  },
  nav: {
    ...loginStyle.nav,
  },
  logo: {
    ...loginStyle.logo,
  },
  wrapper: {
    width: '100%',
    maxWidth: '350px',
    borderRadius: '5px',
    background: colors.white,
    margin: '0 auto',
    padding: '5px',
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '70px 10px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '300px',
    paddingTop: '20px',
    '& button': {
      margin: '20px auto 0 auto ',
      width: '100%',
      maxWidth: '270px',
    },
  },
  formControl: {
    width: '100%',
    maxWidth: '270px',
    margin: '0 auto',
    minHeight: '70px',
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
    minHeight: '45px',
    width: '100%',
    minWidth: '300px',
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default style;
