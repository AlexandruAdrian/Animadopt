// System
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// Icons
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import CloseIcon from '@material-ui/icons/Close';
// Styles
import styles from '../styles/CustomDropzone';

function CustomDropzone(props) {
  const { setFieldValue, multipleFiles, addedImages } = props;
  const MAX_SIZE = 50000000;
  const classes = makeStyles(styles)();
  const onDrop = useCallback((acceptedFiles) => {
    setFieldValue('avatar', acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop,
    maxSize: MAX_SIZE,
    multiple: multipleFiles,
  });

  const style = useMemo(
    () => ({
      ...styles.dropzone,
      ...(!isDragActive ? styles.dropzoneActive : {}),
      ...(isDragAccept ? styles.dropzoneAccepted : {}),
      ...(isDragReject ? styles.dropzoneRejected : {}),
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  const handleImageRemover = () => {
    setFieldValue('avatar', null);
  };

  return (
    <div className={classes.customDropzone}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className={classes.dropzoneContent}>
          {!isDragActive && (
            <>
              <SystemUpdateAltIcon />
              <Typography component="p">Adauga imagine</Typography>
            </>
          )}
          {isDragAccept && (
            <Typography component="p">Adauga imagine</Typography>
          )}
          {isDragReject && !multipleFiles && (
            <Typography component="p">Doar o singura imagine</Typography>
          )}
        </div>
      </div>

      <div className={classes.previewContainer}>
        {addedImages &&
          addedImages.map((image, index) => (
            <div className={classes.previewImageWrapper} key={index}>
              <img
                alt="Preview"
                className={classes.previewImage}
                src={URL.createObjectURL(image)}
              />
              <CloseIcon
                className={classes.previewCloseIcon}
                onClick={handleImageRemover}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

CustomDropzone.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  multipleFiles: PropTypes.bool.isRequired,
  addedImages: PropTypes.array,
};

export default CustomDropzone;
