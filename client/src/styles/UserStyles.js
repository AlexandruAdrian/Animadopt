import colors from './colors';
import AdminUserDetailsStyle from './AdminUserDetailsStyle';

const style = {
  userInfo: {
    width: '100%',
    height: '100%',
    padding: '70px 10px 20px 10px',
  },
  userCard: {
    ...AdminUserDetailsStyle.userCard,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '& > p': {
      color: 'red',
      fontSize: '14px',
      textAlign: 'center',
    },

    '& > button': {
      marginTop: '5px',
    },
  },
};

export default style;
