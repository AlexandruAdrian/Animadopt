import colors from './colors';

const styles = {
  user: {
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      objectFit: 'contain',
      marginRight: '15px',
    },
    '& > p': {
      fontSize: '14px',
      color: colors.darkPacificBlue,
      fontWeight: 'bold',
    },
  },
  userDetails: {
    width: '100%',
    height: '100%',
    paddingTop: '5px',
    fontSize: '14px',
    color: colors.darkPacificBlue,
    '& > li': {
      display: 'flex',
      alignItems: 'center',
      marginTop: '6px',
      flexWrap: 'wrap',
      '& > svg': {
        paddingBottom: '3px',
        marginRight: '5px',
      },
      '& > strong': {
        marginRight: '3px',
        flexWrap: 'wrap',
      },
    },
  },
};

export default styles;
