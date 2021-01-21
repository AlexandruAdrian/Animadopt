import colors from './colors';
import registerFormStyles from './RegisterFormStyles';

const style = {
  container: {
    width: '100%',
    height: '100%',
    padding: '60px 10px 0 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: '500px',
    marginTop: '20px',
    '& > div:first-child': {
      textAlign: 'center',
      '& span': {
        fontSize: '20px',
      },
    },
  },
  userInfo: {
    color: colors.darkPacificBlue,
    '& > div:last-child': {
      display: 'flex',
      flexDirection: 'column',
      '@media (min-width: 540px)': {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
  },
  details: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > ul': {
      margin: '0 auto',
      listStyleType: 'none',
      '& > li:not(:first-child)': {
        marginTop: '8px',
      },
      '& > li': {
        fontSize: '0.865rem',
      },
    },
    '@media (min-width: 540px)': {
      order: '1',
      marginTop: '10px',
      '& > ul': {
        minWidth: '350px',
      },
    },
  },
  avatarWrapper: {
    width: '150px',
    margin: '0 auto',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width: 540px)': {
      order: '2',
    },
    '& > img': {
      width: '110px',
      height: '110px',
      borderRadius: '5px',
      objectFit: 'contain',
    },
    '& > form': {
      position: 'absolute',
      right: '2px',
      bottom: '-10px',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '15px',
      paddingRight: '5px',
      '@media (min-width: 540px)': {},
      '& > label': {
        display: 'flex',
        minWidth: '45px',
        minHeight: '45px',
        borderRadius: '100%',
        color: colors.white,
        backgroundColor: colors.darkPacificBlue,
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        '&:hover': {
          color: colors.white,
          backgroundColor: colors.darkPacificBlue,
        },
      },
      '& > p': {
        fontSize: '14px',
        color: 'red',
        marginTop: '8px',
      },
    },
  },
  security: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '50px',
    '& form': {
      width: '200px',
      paddingTop: '10px',
      display: 'flex',
      flexDirection: 'column',
      '& button': {
        marginTop: '25px',
      },
    },
  },
  inputRoot: {
    ...registerFormStyles.inputRoot,
  },
  adornment: {
    ...registerFormStyles.adornment,
  },
  inputLabelRoot: {
    ...registerFormStyles.inputLabelRoot,
  },
};

export default style;
