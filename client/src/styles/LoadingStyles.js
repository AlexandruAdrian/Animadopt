import colors from './colors';

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  ldsHeart: {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px',
    transform: 'rotate(45deg)',
    transformOrigin: '40px 40px',
    '& div': {
      top: '32px',
      left: '32px',
      position: 'absolute',
      width: '22px',
      height: '22px',
      background: colors.darkPacificBlue,
      animation: '$lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)',
    },
    '& div:after, & div:before': {
      content: '" "',
      position: 'absolute',
      display: 'block',
      width: '22px',
      height: '22px',
      background: colors.darkPacificBlue,
    },
    '& div:before': {
      left: '-15px',
      borderRadius: '50% 0 0 50%',
    },
    '& div:after': {
      top: '-15px',
      borderRadius: '50% 50% 0 0',
    },
  },
  '@keyframes lds-heart': {
    '0%': {
      transform: 'scale(0.95)',
    },
    '5%': {
      transform: 'scale(1.1)',
    },
    '39%': {
      transform: 'scale(0.85)',
    },
    '45%': {
      transform: 'scale(1)',
    },
    '60%': {
      transform: 'scale(0.95)',
    },
    '100%': {
      transform: 'scale(0.9)',
    },
  },
  loadingText: {
    color: colors.darkPacificBlue,
    fontSize: '14px',
  },
};

export default styles;
