import colors from './colors';

const style = {
  userCard: {
    minHeight: '200px',
    '@media (min-width: 500px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '230px',
      maxHeight: '230px',
    },
    '@media (min-width: 1280px)': {
      minHeight: '360px',
      maxHeight: '350px',
      paddingBottom: '5px',
    },
    '& > div:first-child': {
      width: '100%',
      '@media (min-width: 500px)': {
        display: 'flex',
        justifyContent: 'space-between',
      },
      '@media (min-width: 1280px)': {
        flexDirection: 'column',
      },
    },
  },
  avatar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    order: '1',
    '@media (min-width: 500px)': {
      order: '2',
      width: '100px',
      alignItems: 'center',
    },
    '@media (min-width: 1280px)': {
      order: '1',
      alignSelf: 'center',
    },
    '& > img': {
      width: '70px',
      height: '70px',
      borderRadius: '5px',
      objectFit: 'contain',
      '@media (min-width: 500px)': {
        width: '100px',
        height: '100px',
      },
    },
  },
  details: {
    marginTop: '15px',
    order: '2',
    display: 'flex',
    '@media (min-width: 500px)': {
      order: '1',
    },
    '@media (min-width: 960px)': {
      marginTop: '0',
    },
    '@media (min-width: 1280px)': {
      order: '2',
      marginTop: '15px',
    },
    '& > ul': {
      color: colors.darkPacificBlue,
      '& > li': {
        fontSize: '14px',
        paddingRight: '5px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > strong': {
          marginRight: '3px',
        },
        '& > svg': {
          paddingBottom: '2px',
        },
      },
      '& > li:not(:last-child)': {
        marginBottom: '5px',
      },
    },
  },
  userActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > button': {
      width: '100%',
      maxWidth: '245px',
      '@media (min-width: 1280px)': {
        maxWidth: '100%',
      },
    },
    '& > button:not(:first-child)': {
      marginTop: '10px',
    },
  },
  banned: {
    fontSize: '14px',
    color: 'red',
    textAlign: 'center',
  },
};

export default style;
