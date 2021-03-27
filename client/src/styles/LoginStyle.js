import colors from './colors';
import logo from '../assets/logo.png';

const style = {
  container: {
    backgroundColor: colors.darkPacificBlue,
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: colors.white,
    width: '100%',
    maxWidth: '350px',
    height: '100%',
    maxHeight: '500px',
    display: 'flex',
    padding: '60px 0 20px 0',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid black',
  },
  nav: {
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
  formWrapper: {
    width: '80%',
    maxWidth: '260px',
    height: 'auto',
    alignSelf: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginTop: '50px',
    maxHeight: '200px',
  },
  error: {
    fontSize: '14px',
    minHeight: '45px',
    color: 'red',
    textAlign: 'center',
  },
  utilities: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '10px',
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
