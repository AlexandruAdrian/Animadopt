import colors from './colors';
import logo from '../assets/logo.png';

const styles = {
  container: {
    backgroundColor: colors.pacificBlue,
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
    paddingTop: '10px',
  },
  nav: {
    width: '100%',
    height: '40px',
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    height: '100%',
    cursor: 'pointer',
  },
  successWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '10px 0',
    color: colors.darkPacificBlue,
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      '& p': {
        fontSize: '14px',
        textAlign: 'center',
        padding: '0 10px',
      },
      '& h2': {
        color: colors.darkPacificBlue,
        fontSize: '20px',
        marginTop: '50px',
      },
    },
  },
  failWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0 5px',
    '& > p': {
      color: colors.darkPacificBlue,
      fontSize: '14px',
      textAlign: 'center',
    },
    '& > button': {
      marginTop: '20px',
    },
  },
  userDetailsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 15px 10px',
    height: 'auto',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '0 0 10px',
    },
    '& img': {
      width: '100px',
      height: '100px',
      borderRadius: '5px',
      objectFit: 'cover',
      marginTop: '10px',
      '@media (min-width: 768px)': {
        marginRight: '10px',
      },
    },
    '& ul': {
      marginTop: '10px',
    },
    '& strong': {
      fontWeight: '550',
    },
    '& li': {
      listStyleType: 'none',
      fontSize: '14px',
      marginTop: '5px',
      color: colors.darkPacificBlue,
    },
  },
  registerSuccessFooter: {
    textDecoration: 'none',
    margin: '0 auto 10px auto',
  },
};

export default styles;
