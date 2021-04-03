import colors from './colors';

const style = {
  sideMenu: {
    backgroundColor: colors.white,
    width: '210px',
    height: '100%',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& > li:first-child': {
      marginBottom: '10px',
    },
    '& > li': {
      cursor: 'pointer',
    },
    '& > li:not(:first-child)': {
      cursor: 'pointer',
      '& > div:nth-child(2)': {
        paddingTop: '2px',
      },
      '&:hover': {
        backgroundColor: colors.darkPacificBlue,
        transition: 'background-color .3s ease',
      },
      '& p, & span': {
        fontSize: '14px',
      },
    },
  },
  option: {
    '& a': {
      display: 'flex',
      textDecoration: 'none',
      color: colors.darkPacificBlue,
    },
    '&:hover svg, &:hover p, &:hover span': {
      color: colors.white,
      transition: 'color .3s ease',
    },
  },
  icon: {
    color: colors.darkPacificBlue,
  },
  logout: {
    marginTop: 'auto',
    color: 'red',
    '& svg': {
      color: 'red',
    },
  },
  userDetails: {
    '& p': {
      fontSize: '14px',
    },
    '@media (min-width: 1024px)': {
      display: 'none',
    },
  },
  profile: {
    width: '30px',
    height: '30px',
    marginRight: '27px',
    '& > img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'contain',
    },
  },
};

export default style;
