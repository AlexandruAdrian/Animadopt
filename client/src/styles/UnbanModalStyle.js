import colors from './colors';
import banModalStyles from './BanModalStyle';

const style = {
  modal: {
    ...banModalStyles.modal,
  },
  formContainer: {
    ...banModalStyles.formContainer,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: '100px',
    height: '250px',
    display: 'flex',
    width: '95%',
    flexDirection: 'column',
    '& > p': {
      textAlign: 'center',
      color: colors.darkPacificBlue,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 'auto',

    '& > button:first-child': {
      border: 'none',
      color: colors.darkPacificBlue,
    },
    '& > button': {
      width: '50px',
      marginLeft: '10px',
      marginTop: '25px',
    },
  },
};

export default style;
