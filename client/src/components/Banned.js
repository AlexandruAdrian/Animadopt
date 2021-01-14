// System
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ro';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Icons
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CloseIcon from '@material-ui/icons/Close';
// Actions
import { resetLoginState } from '../containers/Login/actions';
// Styles
import style from '../styles/BannedStyle';

function Banned({ banDetails }) {
  const dispatch = useDispatch();
  const classes = makeStyles(style)();
  const [show, setShow] = useState(false);
  moment().locale('ro');
  useEffect(() => {
    setShow(banDetails.isBanned);
  }, [banDetails.isBanned]);

  const handleClose = () => {
    setShow(false);
    dispatch(resetLoginState());
  };

  return show ? (
    <Box className={classes.bannedModal}>
      <Box className={classes.wrapper}>
        <Box className={classes.closeIcon}>
          <CloseIcon onClick={handleClose} />
        </Box>
        <Box className={classes.forbiddenIcon}>
          <RemoveCircleIcon />
        </Box>
        <Box className={classes.banInfo}>
          <Typography component="p">
            Contul dumneavoastra a fost blocat, pentru mai multe informatii
            contactati-ne la <strong>roanimadopt@gmail.com</strong>
            <strong></strong>
          </Typography>
          <Box>
            <Typography component="p">
              <strong>Motiv:</strong>
              {` ${banDetails.reason}`}
            </Typography>
            <Typography component="p">
              <strong>Expira la:</strong>
              {` ${moment(banDetails.endTime).format('llll')}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : null;
}

Banned.propTypes = {
  banDetails: PropTypes.object.isRequired,
};

export default Banned;
