import colors from './colors';

const style = {
  primary: {
    textTransform: 'capitalize',
    width: '200px',
    backgroundColor: colors.pacificBlue,
    color: colors.white,
    transition: 'opacity 0.2s ease',
    '&:hover': {
      backgroundColor: colors.pacificBlue,
      opacity: '0.8',
    },
  },
  secondary: {
    textTransform: 'capitalize',
    width: '200px',
    border: `1px solid ${colors.pacificBlue}`,
    color: colors.pacificBlue,
  },
  dark: {
    textTransform: 'capitalize',
    width: '200px',
    backgroundColor: colors.darkPacificBlue,
    color: colors.white,
    '&:hover': {
      backgroundColor: colors.darkPacificBlue,
      opacity: '0.8',
    },
  },
};

export default style;
