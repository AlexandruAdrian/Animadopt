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
    maxWidth: '450px',
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '25px',
  },
  previewImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },
  previewImageWrapper: {
    position: 'relative',
  },
  previewCloseIcon: {
    position: 'absolute',
    top: '-12px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default styles;
