import colors from './colors';
import logo from '../assets/logo.png';

const style = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.darkPacificBlue,
    width: '100%',
    height: '60px',
    color: colors.white,
    zIndex: '999',
    '& svg': {
      cursor: 'pointer',
    },
  },
  grid: {
    height: '100%',
    alignItems: 'center',
    padding: '0 15px',
    '& > div': {
      height: '100%',
      alignItems: 'center',
    },
    '@media (min-width: 1024px)': {
      padding: '0px 40px',
    },
  },
  menu: {
    display: 'flex',
  },
  logoWrapper: {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (min-width: 1024px)': {
      padding: '10px 0px',
    },
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    height: '33px',
    width: '100%',
    maxWidth: '160px',
  },
  user: {
    paddingLeft: '10px',
    display: 'flex',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > img': {
      width: '35px',
      height: '35px',
      objectFix: 'contain',
      borderRadius: '50%',
      marginRight: '10px',
      display: 'none',
      '@media (min-width: 1024px)': {
        display: 'block',
      },
    },
    '& > p': {
      display: 'none',
      marginRight: '20px',
      fontSize: '15px',
      '@media (min-width: 1024px)': {
        display: 'block',
      },
    },
  },
  notifications: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  notificationBubble: {
    position: 'absolute',
    top: '-5px',
    right: '-2px',
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '14px',
    height: '14px',
    '& > p': {
      fontSize: '10px',
      paddingRight: '1.5px',
      paddingTop: '0.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      textAlign: 'center',
    },
  },
};

export default style;
