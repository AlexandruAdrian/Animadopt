import colors from './colors';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    padding: '70px 10px 20px 10px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width: 500px)': {
      maxWidth: '700px',
    },
  },
  card: {
    transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    padding: '20px 10px',
    '@media (min-width: 960px)': {
      width: '700px',
    },
  },
  form: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: '0 15px',
    '& > div:first-child': {
      height: 'auto',
      padding: '0',
      margin: '0',
      outline: 'none',
      justifyContent: 'center',
    },
    '& > button': {
      width: '100%',
    },
  },
  inputs: {
    margin: '20px 0 40px',
    width: '100%',
    '& > div:not(:first-child)': {
      marginTop: '10px',

      '& ul, & li': {
        fontSize: '14px',
      },
    },
  },
  inputLabelRoot: {
    fontSize: '14px',
    color: 'gray',
  },
  inputRoot: {
    fontSize: '14px',
  },
  listItem: {
    fontSize: '14px',
    '&:hover': {
      backgroundColor: colors.darkPacificBlue,
      color: colors.white,
    },
  },
  selectedItem: {
    backgroundColor: `${colors.darkPacificBlue} !important`,
    color: colors.white,
  },
  formControl: {
    marginTop: '10px',
  },
  selectMenu: {
    fontSize: '14px',
  },
  errorSelect: {
    border: '1px solid red',
  },
};

export default styles;
