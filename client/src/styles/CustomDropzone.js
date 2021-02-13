import colors from './colors';

const styles = {
  customDropzone: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '25px',
  },
  dropzone: {
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
    backgroundColor: colors.lightPacificBlue,
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '125px',
    color: colors.darkPacificBlue,
  },
  dropzoneContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      fontSize: '14px',
    },
  },
  dropzoneActive: {
    border: '2px dashed black',
  },
  dropzoneAccepted: {
    border: '2px dashed green',
    color: 'green',
  },
  dropzoneRejected: {
    border: '2px dashed red',
    color: 'red',
  },
  previewContainer: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '25px',
    '& > div:not(:first-child), & > div:not(:last-child)': {
      marginRight: '5px',
    },
  },
  previewImages: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  previewImage: {
    width: '65px',
    height: '65px',
    objectFit: 'cover',
    '@media (min-width: 620px)': {
      width: '80px',
      height: '80px',
    },
  },
  previewImageWrapper: {
    position: 'relative',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    opacity: '0.5',
    borderRadius: '50%',
    backgroundColor: '#000',
  },
  previewCloseIcon: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default styles;
