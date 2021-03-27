// System
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Card, CardActions } from '@material-ui/core';
// Components
import BanModal from '../../components/BanModal';
import ConfirmationModal from '../../components/ConfirmationModal';
import UserInfo from '../../components/UserInfo';
import CustomButton from '../../components/CustomButton';
import UserBanHistory from '../../components/UserBanHistory';
import AdminUserPosts from '../../components/AdminUserPosts';
// Actions
import { unbanUser, promoteUser, demoteUser, fetchUser } from './actions';
// Constants
import { USER_ROLE_ADMIN, USER_ROLE_OWNER } from '../Dashboard/constants';
import {
  UNBAN_CONFIRMATION_MESSAGE,
  PROMOTION_CONFIRMATION_MESSAGE,
  DEMOTION_CONFIRMATION_MESSAGE,
} from './constants';
// Style
import style from '../../styles/UserStyles';
// Utils
import { has, get, isEmpty } from 'lodash';

function User({ loggedUser }) {
  const classes = makeStyles(style)();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openBanModal, setOpenBanModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const { selectedUser } = useSelector((state) => state.users);
  const { id } = useParams();

  useEffect(() => {
    if (isEmpty(selectedUser)) {
      dispatch(fetchUser(id));
    }
  }, [selectedUser]);

  const handleCloseBanModal = () => {
    setOpenBanModal(false);
  };

  const handleOpenBanModal = () => {
    setOpenBanModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUnbanUser = () => {
    dispatch(unbanUser(selectedUser._id));
    handleCloseModal();
  };

  const handlePromoteUser = () => {
    dispatch(promoteUser(selectedUser._id));
    handleCloseModal();
  };

  const handleDemoteUser = () => {
    dispatch(demoteUser(selectedUser._id));
    handleCloseModal();
  };

  const handleOpenUnbanModal = () => {
    setConfirmationMessage(UNBAN_CONFIRMATION_MESSAGE);
    setOpenModal(true);
  };

  const handleOpenPromotionModal = () => {
    setConfirmationMessage(PROMOTION_CONFIRMATION_MESSAGE);
    setOpenModal(true);
  };

  const handleOpenDemotionModal = () => {
    setConfirmationMessage(DEMOTION_CONFIRMATION_MESSAGE);
    setOpenModal(true);
  };

  let handler;
  if (confirmationMessage === UNBAN_CONFIRMATION_MESSAGE) {
    handler = handleUnbanUser;
  } else if (confirmationMessage === PROMOTION_CONFIRMATION_MESSAGE) {
    handler = handlePromoteUser;
  } else {
    handler = handleDemoteUser;
  }

  return (
    <Box className={classes.userInfo}>
      <Box className={classes.user}>
        <Card>
          <UserInfo user={selectedUser} />
          <CardActions disableSpacing={true} className={classes.actions}>
            {selectedUser.ban && selectedUser.ban.isValid && (
              <Box className={classes.banned}>
                <p>
                  <strong>Utilizator blocat pana la: </strong>
                  {moment(selectedUser.ban.endTime).format('llll')}
                </p>
                <p>
                  <strong>Motiv: </strong>
                  {selectedUser.ban.reason}
                </p>
                <Box className={classes.unban}>
                  <CustomButton
                    handler={handleOpenUnbanModal}
                    text={'Deblocheaza'}
                    dark
                    size="small"
                  />
                </Box>
              </Box>
            )}
            <Box className={classes.buttonGroup}>
              {has(loggedUser, 'role') &&
                get(loggedUser, 'role.type') === USER_ROLE_OWNER &&
                !selectedUser.ban && (
                  <>
                    {get(loggedUser, 'role.type') === USER_ROLE_OWNER &&
                      get(selectedUser, 'role.type') !== USER_ROLE_OWNER && (
                        <CustomButton
                          handler={handleOpenPromotionModal}
                          text={'Promoveaza'}
                          dark
                          size={'small'}
                        />
                      )}
                    {get(loggedUser, 'role.type') === USER_ROLE_OWNER &&
                      get(selectedUser, 'role.type') === USER_ROLE_ADMIN && (
                        <CustomButton
                          handler={handleOpenDemotionModal}
                          text={'Retrogradeaza'}
                          danger
                          size={'small'}
                        />
                      )}
                  </>
                )}
              {(!selectedUser.ban || !selectedUser.ban.isValid) &&
                get(selectedUser, 'role.type') !== USER_ROLE_OWNER && (
                  <CustomButton
                    handler={handleOpenBanModal}
                    text={'Blocheaza'}
                    danger
                    size={'small'}
                  />
                )}
            </Box>
          </CardActions>
        </Card>
        <AdminUserPosts userId={selectedUser._id} />
      </Box>

      <UserBanHistory userId={selectedUser._id} />

      {selectedUser._id && (
        <BanModal
          open={openBanModal}
          onClose={handleCloseBanModal}
          userId={selectedUser._id}
        />
      )}
      {selectedUser._id && (
        <ConfirmationModal
          open={openModal}
          onClose={handleCloseModal}
          confirmationText={confirmationMessage}
          confirmationHandler={handler}
        />
      )}
    </Box>
  );
}

User.propTypes = {
  loggedUser: PropTypes.object.isRequired,
};

export default User;
