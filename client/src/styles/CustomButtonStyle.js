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
    border: `1px solid ${colors.darkPacificBlue}`,
    color: colors.darkPacificBlue,
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
  success: {
    textTransform: 'capitalize',
    width: '200px',
    backgroundColor: 'green',
    color: colors.white,
    '&:hover': {
      backgroundColor: 'green',
      opacity: '0.8',
    },
  },
  danger: {
    textTransform: 'capitalize',
    width: '200px',
    backgroundColor: 'red',
    color: colors.white,
    '&:hover': {
      backgroundColor: 'red',
      opacity: '0.8',
    },
  },
};

export default style;
