const styles = {
  successWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > p': {
      fontSize: '14px',
      textAlign: 'center',
    },
    '& > button': {
      marginTop: '20px',
    },
  },
  iconWrapper: {
    marginBottom: '10px',
    '& > svg': {
      color: 'green',
      fontSize: '32px',
    },
  },
};

export default styles;
