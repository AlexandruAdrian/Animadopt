const styles = {
  postsPage: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    padding: '60px 10px 20px 10px',
    margin: '0 auto',
    '@media (min-width: 500px)': {
      maxWidth: '500px',
    },
    '@media (min-width: 960px)': {
      maxWidth: '1000px',
    },
    '@media (min-width: 1300px)': {
      maxWidth: '100%',
      width: '70%',
      marginLeft: '300px',
    },
  },
  mobileFilters: {
    '@media (min-width: 1300px)': {
      display: 'none',
    },
  },
};

export default styles;
