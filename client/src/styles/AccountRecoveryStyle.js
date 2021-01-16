import colors from './colors';
import registerFormStyles from './RegisterFormStyles';
import loginStyle from './LoginStyle';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.pacificBlue,
  },
  nav: {
    ...loginStyle.nav,
  },
  logo: {
    ...loginStyle.logo,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 10px 0px',
    width: '100%',
    maxWidth: '350px',
    borderRadius: '5px',
    background: colors.white,
    margin: '0 auto',
    height: '250px',
  },
  formWrapper: {
    width: '100%',
    height: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '300px',
    paddingTop: '25px',
    '& button': {
      margin: '0 auto',
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
