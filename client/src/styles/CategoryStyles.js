import colors from './colors';

const styles = {
  category: {
    cursor: 'pointer',
    borderBottom: `1px solid ${colors.darkPacificBlue}`,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.darkPacificBlue,
      '& p': {
        color: colors.white,
      },
    },
    '& p': {
      fontSize: '14px',
      color: colors.darkPacificBlue,
      paddingLeft: '6px',
    },
    '& > div:last-child': {
      textAlign: 'right',
      padding: '6px 6px 6px 0px',
    },
  },
};

export default styles;
