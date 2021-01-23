import colors from './colors';
import logo from '../assets/logo.png';

const style = {
  container: {
    backgroundColor: colors.pacificBlue,
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    borderRadius: '5px',
    backgroundColor: colors.white,
    width: '100%',
    maxWidth: '350px',
    height: '100%',
    maxHeight: '500px',
    display: 'flex',
    padding: '45px 0 20px 0',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nav: {
    width: '100%',
    height: '40px',
    paddingRight: '10px',
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    height: '100%',
    cursor: 'pointer',
  },
  formWrapper: {
    width: '80%',
    maxWidth: '260px',
    alignSelf: 'center',
    paddingTop: '50px',
  },
  form: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '228px',
    '& > button': {
      marginTop: '40px',
      width: '100%',
    },
  },
  error: {
    fontSize: '14px',
    minHeight: '45px',
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  utilities: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 'auto',
    height: '45px',
    '& a': {
      textDecoration: 'none',
      color: colors.darkPacificBlue,
      textAlign: 'center',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& p': {
      fontSize: '13px',
      cursor: 'pointer',
    },
  },
};

export default style;
