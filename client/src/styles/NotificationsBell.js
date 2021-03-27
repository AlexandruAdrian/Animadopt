const styles = {
  notifications: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  notificationBubble: {
    position: 'absolute',
    top: '-7px',
    right: '-4px',
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '15.5px',
    height: '15.5px',
    '& > p': {
      fontSize: '10px',
      paddingRight: '1.5px',
      paddingTop: '0.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      textAlign: 'center',
    },
  },
};

export default styles;
