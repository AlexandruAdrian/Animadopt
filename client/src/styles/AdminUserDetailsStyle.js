const style = {
  userActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > button': {
      width: '100%',
      maxWidth: '245px',
      '@media (min-width: 1280px)': {
        maxWidth: '100%',
      },
    },
    '& > button:not(:first-child)': {
      marginTop: '10px',
    },
  },
  userCard: {
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  banned: {
    fontSize: '14px',
    color: 'red',
    textAlign: 'center',
  },
};

export default style;
