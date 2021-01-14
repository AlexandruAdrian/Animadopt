import colors from './colors';

const styles = {
  backArrow: {
    position: 'absolute',
    top: '15px',
    left: '7px',
    textDecoration: 'none',
    color: colors.white,
    '@media (min-width: 1024px)': {
      display: 'none',
    },
  },
};

export default styles;
