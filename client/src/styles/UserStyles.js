import colors from './colors';

const style = {
  userInfo: {
    width: '100%',
    height: '100%',
    padding: '70px 10px 20px 10px',
    '@media (min-width: 850px)': {
      width: '90%',
      maxWidth: '1000px',
      margin: '0 auto',
      position: 'relative',
    },
  },
  banHistory: {
    width: '100%',
    marginTop: '10px',
    '& h3': {
      textAlign: 'center',
      color: colors.white,
      backgroundColor: colors.darkPacificBlue,
      padding: '8px',
    },
  },
  historyCard: {
    '& > p': {
      marginTop: '10px',
      fontSize: '14px',
      color: colors.darkPacificBlue,
      textAlign: 'center',
      paddingBottom: '8px',
    },
  },
  postsHistory: {
    width: '100%',
    marginTop: '10px',
    '& h3': {
      textAlign: 'center',
      color: colors.white,
      backgroundColor: colors.darkPacificBlue,
      padding: '8px',
    },
  },
  postsCard: {
    '& > p': {
      marginTop: '10px',
      fontSize: '14px',
      color: colors.darkPacificBlue,
      textAlign: 'center',
      paddingBottom: '8px',
    },
  },
  user: {
    maxWidth: '360px',
    margin: '0 auto',
    '@media (min-width: 850px)': {
      position: 'absolute',
      padding: '0 5px',
      top: '70px',
      right: '0',
      width: '360px',
    },
  },
  banned: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'left',
    width: '100%',
    paddingTop: '2px',

    '& > button': {
      width: '100%',
      marginTop: '6px',
    },
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& > button': {
      width: '100%',
    },
    '& > button:not(:first-child)': {
      marginTop: '6px',
    },
    '@media (min-width: 380px)': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      '& > button:not(:first-child)': {
        marginTop: '0',
      },
      '& > button:nth-child(2)': {
        margin: '0 5px',
      },
    },
  },
  bans: {
    width: '100%',
    '& > div': {
      marginTop: '8px',
      padding: '8px',
      fontSize: '14px',
      color: colors.darkPacificBlue,
    },
  },
  banDetails: {
    '& p': {
      fontSize: '14px',
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
        marginRight: '5px',
      },
      '& > strong': {
        marginRight: '5px',
      },
    },
    '& > div:not(:first-child)': {
      marginTop: '4px',
    },
  },
  activeBanText: {
    color: 'green',
  },
  inactiveBanText: {
    color: 'red',
  },
};

export default style;
