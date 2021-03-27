import colors from './colors';

const styles = {
  notificationsContainer: {
    width: '260px',
    maxHeight: '700px',
    overflowY: 'auto',
    position: 'absolute',
    borderRadius: '5px',
    top: '40px',
    right: '-20px',
    zIndex: '9999',
    padding: '8px 0 0 0',
    '& > h3': {
      padding: '8px',
    },
    '@media (min-width: 280px)': {
      width: '280px',
    },
    '@media (min-width: 320px)': {
      width: '320px',
    },
    '@media (min-width: 360px)': {
      width: '360px',
    },
    '@media (min-width: 375px)': {
      width: '375px',
    },
    '@media (min-width: 750px)': {
      width: '320px',
    },
    '@media (min-width: 1100px)': {
      right: '-30px',
    },
    '@media (max-height: 300px)': {
      maxHeight: '290px',
    },
    '@media (max-height: 700px)': {
      maxHeight: '500px',
    },
  },
  notificationsList: {
    width: '100%',
    height: '100%',
    '& > a': {
      textDecoration: 'none',
    },
  },
  noNotifications: {
    fontSize: '14px',
    color: colors.darkPacificBlue,
    padding: '8px',
  },
  notificationsItem: {
    cursor: 'pointer',
    borderBottom: `1px solid ${colors.offWhite}`,
    display: 'flex',
    '&  span': {
      fontSize: '14px',
      color: colors.darkPacificBlue,
    },
    '& p': {
      fontSize: '12px',
      marginTop: '8px',
    },
    '&:hover': {
      backgroundColor: colors.darkPacificBlue,
      transition: '.3s ease-in-out',
      '& p': {
        color: colors.white,
      },
      '& span': {
        color: colors.white,
      },
    },
  },
  unseenNotification: {
    cursor: 'pointer',
    backgroundColor: colors.offWhite,
    '&:hover': {
      backgroundColor: colors.darkPacificBlue,
      transition: '.3s ease-in-out',
      '& p': {
        color: colors.white,
      },
      '& span': {
        color: colors.white,
      },
    },
  },
  approved: {
    color: 'green',
    fontSize: '22px',
  },
  rejected: {
    color: 'red',
    fontSize: '22px',
  },
};

export default styles;
