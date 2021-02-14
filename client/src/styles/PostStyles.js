import colors from './colors';

const styles = {
  header: {
    maxHeight: '230px',
  },
  carousel: {
    maxHeight: '230px',
    '& div, & ul': {
      maxHeight: '250px',
    },
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '15px',
    color: colors.darkPacificBlue,
  },
  detailList: {
    padding: 0,
  },
  listItem: {
    padding: 0,
    color: colors.darkPacificBlue,
    '& span': {
      fontSize: '14px',
    },
    '& p': {
      fontSize: '12px',
    },
    '& > div:first-child': {
      minWidth: '40px',
    },
  },
  footerList: {
    padding: 0,
  },
};

export default styles;
