import colors from './colors';
import logo from '../assets/logo.png';

const styles = {
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
    height: '40px',
    minHeight: '35px',
    marginTop: '10px',
  },
};

export default styles;
