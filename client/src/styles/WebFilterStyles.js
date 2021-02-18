const styles = {
  webFilters: {
    display: 'none',
    '@media (min-width: 1300px)': {
      display: 'block',
      width: '250px',
      overflow: 'hidden',
      maxHeight: '90%',
      position: 'fixed',
      padding: '10px 0',
      top: '75px',
      left: '20px',
      bottom: '0px',
    },
  },
  webFiltersWrapper: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    padding: '0 40px 0 15px',
    boxSizing: 'content-box',
    '& > div:last-child': {
      marginTop: '40px',
    },
  },
  webFiltersTitle: {
    display: 'flex',
    marginBottom: '40px',
    '& > svg': {
      marginRight: '5px',
    },
  },
};

export default styles;
