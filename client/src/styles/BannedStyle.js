import colors from './colors';

const style = {
  bannedModal: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    maxWidth: '500px',
    height: '100%',
    maxHeight: '300px',
    borderRadius: '5px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    color: colors.darkPacificBlue,
  },
  closeIcon: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    '& > svg': {
      cursor: 'pointer',
    },
  },
  forbiddenIcon: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: 'red',
    marginTop: '20px',
    '& > svg': {
      fontSize: '60px',
    },
  },
  banInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '25px',
    '& > p': {
      textAlign: 'center',
    },
  },
};

export default style;
