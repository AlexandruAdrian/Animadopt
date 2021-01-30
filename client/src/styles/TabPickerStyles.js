import colors from './colors';

const styles = {
  appBar: {
    backgroundColor: colors.white,
    color: colors.darkPacificBlue,
    fontSize: '14px',
  },
  tab: {
    fontSize: '14px',
    textTransform: 'capitalize',
  },
  selectedTab: {
    backgroundColor: colors.darkPacificBlue,
    color: colors.white,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  indicator: {
    display: 'none',
  },
};

export default styles;
