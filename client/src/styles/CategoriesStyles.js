import colors from './colors';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    padding: '60px 10px 20px 10px',
    margin: '0 auto',
    '@media (min-width: 500px)': {
      maxWidth: '500px',
    },
    '@media (min-width: 960px)': {
      maxWidth: '1000px',
    },
  },
  grid: {
    borderRadius: '5px',
    marginTop: '15px',
    padding: '10px 0',
    width: '100%',
    backgroundColor: colors.white,
    fontSize: '14px',
    margin: '0 auto',
    color: colors.darkPacificBlue,
    '& > div:first-child': {
      backgroundColor: colors.darkPacificBlue,
      color: colors.white,
      padding: '8px',
      borderTopRadius: '5px',
      '& > div:last-child': {
        textAlign: 'right',
      },
    },
  },
  categoriesAction: {
    marginTop: '20px',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      width: '130px',
    },
  },
};

export default styles;
