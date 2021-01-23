import colors from './colors';
import lostPuppy from '../assets/lost-puppy.png';

const style = {
  container: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: colors.darkPacificBlue,
    fontSize: '60px',
    marginBottom: '10px',
    paddingRight: '3px',
  },
  picture: {
    backgroundImage: `url(${lostPuppy})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    width: '100%',
    height: '250px',
    marginBottom: '10px',
  },
  text: {
    textAlign: 'center',
    color: colors.darkPacificBlue,
    marginBottom: '10px',
    '@media (min-width: 1024px)': {
      fontSize: '24px',
    },
  },
};

export default style;
