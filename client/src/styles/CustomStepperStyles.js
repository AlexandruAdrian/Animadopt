import colors from './colors';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepper: {
    marginTop: '25px',
    height: '80px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  stepperRoot: {
    backgroundColor: 'gray',
    color: colors.white,
    width: '45px',
    height: '45px',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },
  stepperActive: {
    backgroundColor: colors.pacificBlue,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  stepperCompleted: {
    backgroundColor: colors.pacificBlue,
  },
  stepperLabelRoot: {
    color: 'gray',
  },
  stepperLabelActive: {
    color: `${colors.pacificBlue} !important`,
  },
  stepperLabelCompleted: {
    color: `${colors.pacificBlue} !important`,
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '10px',
    padding: '5px',
    paddingBottom: '10px',
    '& button': {
      width: '120px',
    },
    '& button:disabled': {
      backgroundColor: 'gray',
      color: colors.white,
      opacity: '0.6',
    },
  },
};

export default styles;