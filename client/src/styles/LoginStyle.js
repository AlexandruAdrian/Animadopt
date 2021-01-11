import colors from './colors';
import logo from '../assets/logo.png';

const style = {
  container: {
    backgroundImage: `linear-gradient(135deg, #b3dde5, ${colors.pacificBlue})`,
    width: '100%',
    height: '100%',
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
    maxWidth: '700px',
    height: '100%',
    maxHeight: '650px',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    width: '100%',
    height: '50px',
    marginTop: '10px',
  },
  formWrapper: {
    width: '80%',
    height: '170px',
    maxWidth: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto auto',
    '& > button': {
      marginTop: '25px',
      width: '100%',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '95px',
    justifyContent: 'space-between',
  },
};

export default style;
