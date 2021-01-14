import colors from './colors';
import bannedStyle from './BannedStyle';

const style = {
  recoveryModal: {
    ...bannedStyle.bannedModal,
  },
  wrapper: {
    ...bannedStyle.wrapper,
    alignItems: 'center',
    maxHeight: '200px',
    '& > p': {
      fontSize: '14px',
      color: colors.darkPacificBlue,
      textAlign: 'center',
      margin: 'auto 0',
    },
  },
  buttonWrapper: {
    marginTop: 'auto',
  },
};

export default style;
