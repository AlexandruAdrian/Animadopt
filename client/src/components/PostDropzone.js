// System
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// Icons
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import CloseIcon from '@material-ui/icons/Close';
// Utils
import { has } from 'lodash';
// Styles
import styles from '../styles/CustomDropzone';

function PostDropzone(props) {
  const { setFieldValue, addedImages } = props;
  const MAX_SIZE = 50000000;
  const MAX_NUMBER_OF_FILES = 5;
  const classes = makeStyles(styles)();
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length <= MAX_NUMBER_OF_FILES) {
        setFieldValue('pictures', acceptedFiles);
      } else {
        toast.error(
          `Va rugam sa incarcati maxim ${MAX_NUMBER_OF_FILES} imagini`
        );
      }
    },
    [setFieldValue]
  );

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
    multiple: true,
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

  const handleImageRemover = (e, index) => {
    const filteredImages = addedImages.filter((img, imgIndex) => {
      if (index !== imgIndex) {
        return img;
      }

      return;
    });

    setFieldValue('pictures', filteredImages);
  };

  return (
    <div className={classes.customDropzone}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className={classes.dropzoneContent}>
          {!isDragActive && (
            <>
              <SystemUpdateAltIcon />
              <Typography component="p">Adauga imagini</Typography>
            </>
          )}
          {isDragAccept && (
            <Typography component="p">Adauga imagini</Typography>
          )}
          {isDragReject && (
            <Typography component="p">Fisiere invalide</Typography>
          )}
        </div>
      </div>

      <div className={classes.previewContainer}>
        {addedImages &&
          addedImages.map((image, index) => {
            const src = has(image, 'path')
              ? URL.createObjectURL(image)
              : `${process.env.REACT_APP_API_ENDPOINT}/${image}`;
            return (
              <div className={classes.previewImages} key={index}>
                <div className={classes.previewImageWrapper}>
                  <img
                    alt="Preview"
                    className={classes.previewImage}
                    src={src}
                  />
                  <div className={classes.iconWrapper}>
                    <CloseIcon
                      className={classes.previewCloseIcon}
                      onClick={(e) => handleImageRemover(e, index)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

PostDropzone.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  addedImages: PropTypes.array,
};

export default PostDropzone;
