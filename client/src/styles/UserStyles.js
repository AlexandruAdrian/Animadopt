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

    '& > p': {
      color: 'red',
      fontSize: '14px',
      textAlign: 'left',
      width: '100%',
      paddingTop: '2px',
    },

    '& > button': {
      marginTop: '5px',
    },
  },
};

export default style;
