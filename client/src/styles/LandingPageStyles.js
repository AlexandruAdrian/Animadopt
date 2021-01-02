import colors from './colors';
import logo from '../assets/logo.png';
import pets from '../assets/pets.png';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
    },
  },
  logoPets: {
    width: '100%',
    '@media (min-width: 1024px)': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30%',
    },
  },
  pets: {
    backgroundImage: `url(${pets})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    width: '100%',
    height: '200px',
    '@media (min-width: 1024px)': {
      height: '40%',
      maxHeight: '380px',
    },
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    width: '100%',
    height: '50px',
    marginTop: '15px',
    '@media (min-width: 1024px)': {
      display: 'none',
    },
  },
  logoRight: {
    display: 'none',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    width: '100%',
    height: '50px',
    marginTop: '15px',
    '@media (min-width: 1024px)': {
      display: 'block',
    },
  },
  promoButtons: {
    width: '100%',
    '@media (min-width: 1024px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.pacificBlue,
      width: '70%',
    },
  },
  promo: {
    padding: '0 10px',
    marginTop: '20px',
    color: colors.pacificBlue,
    textAlign: 'center',
    '& > h1': {
      fontSize: '14px',
    },
    '@media (min-width: 1024px)': {
      display: 'none',
    },
  },
  login: {
    '@media (min-width: 1024px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '350px',
      borderRadius: '15px',
      padding: '10px 5px 30px 5px',
      backgroundColor: colors.isabelline,
      marginTop: '35px',
    },
  },
  buttons: {
    width: '100%',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    '& > button': {
      textTransform: 'capitalize',
      width: '200px',
      marginLeft: '10px',
    },
    '& > button:first-child': {
      backgroundColor: colors.pacificBlue,
      color: colors.isabelline,
    },
    '& > button:last-child': {
      border: `1px solid ${colors.pacificBlue}`,
      color: colors.pacificBlue,
    },
  },
};

export default styles;
