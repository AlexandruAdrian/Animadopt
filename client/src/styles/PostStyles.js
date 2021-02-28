import colors from './colors';
const styles = {
  postPage: {
    width: '100%',
    height: '100%',
    padding: '80px 10px 20px 10px',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    '@media (min-width: 1250px)': {
      width: '1200px',
      flexDirection: 'row',
    },
  },
  userInfoWrapper: {
    marginBottom: '15px',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    '@media (min-width: 1250px)': {
      order: '2',
      width: '400px',
    },
  },
  userInfo: {
    '@media (min-width: 1250px)': {
      maxHeight: '135px',
    },
  },
  post: {
    maxWidth: '600px',
    width: '100%',
    height: 'auto',
    margin: '0 auto',
  },
  header: {
    maxHeight: '400px',
  },
  postActions: {
    padding: '4px 8px',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    '& > button': {
      width: '49%',
    },
    '& > button:first-child': {
      marginRight: '8px',
    },
  },
  carousel: {
    '& div, & ul': {
      maxHeight: '400px',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    },
  },
  generalInformation: {
    display: 'flex',
    marginTop: '30px',
    flexDirection: 'column',
    padding: '0 10px',
    '& > h2': {
      color: colors.darkPacificBlue,
    },
    '@media (min-width: 540px)': {
      marginTop: '60px',
    },
    '@media (min-width: 580px)': {
      marginTop: '90px',
    },
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
  description: {
    padding: '0 10px 10px',
    '& > h2': {
      color: colors.darkPacificBlue,
    },
    '& > p': {
      fontSize: '14px',
      color: colors.darkPacificBlue,
    },
  },
  actions: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > button': {
      width: '49%',
    },
    '& > button:first-child': {
      marginRight: '8px',
    },
  },
  editFormContainer: {
    width: '100%',
    height: '100%',
    padding: '20px 10px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width: 500px)': {
      maxWidth: '700px',
    },
  },
};

export default styles;
