import colors from './colors';

const styles = {
  header: {
    height: '210px',
  },
  carousel: {
    '& div, & ul': {
      height: '210px',
    },
    '& .control-dots': {
      bottom: '-198px',
    },
  },
  card: {
    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: '18px',
    marginBottom: '15px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
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
