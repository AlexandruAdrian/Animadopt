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
    width: '40px',
    height: '40px',
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
    justifyContent: 'center',
    marginTop: '5px',
    padding: '0 5px 10px 5px',
    '& button': {
      width: '120px',
      marginRight: '10px',
    },
    '& button:disabled': {
      backgroundColor: 'gray',
      color: colors.white,
      opacity: '0.6',
    },
  },
};

export default styles;
