// System
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Card, CardActions } from '@material-ui/core';
// Components
import BanModal from '../../components/BanModal';
import UnbanModal from '../../components/UnbanModal';
import UserInfo from '../../components/UserInfo';
import CustomButton from '../../components/CustomButton';
// Actions
import { fetchUser } from './actions';
// Constants
import { USER_ROLE_OWNER, USER_ROLE_USER } from '../Dashboard/constants';
// Style
import style from '../../styles/UserStyles';
// Utils
import { has } from 'lodash';
import moment from 'moment';

function User({ loggedUser }) {
  const classes = makeStyles(style)();
  const dispatch = useDispatch();
  const [openBanModal, setOpenBanModal] = useState(false);
  const [openUnbanModal, setOpenUnbanModal] = useState(false);
  const { id } = useParams();
  const { selectedUser } = useSelector((state) => state.users);

  const handleCloseBanModal = () => {
    setOpenBanModal(false);
  };

  const handleOpenBanModal = () => {
    setOpenBanModal(true);
  };

  const handleCloseUnbanModal = () => {
    setOpenUnbanModal(false);
  };

  const handleOpenUnbanModal = () => {
    setOpenUnbanModal(true);
  };

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  return (
    <Box className={classes.userInfo}>
      <Card className={classes.userCard}>
        <UserInfo user={selectedUser} />
        <CardActions disableSpacing={true} className={classes.actions}>
          {selectedUser.ban && selectedUser.ban.isValid && (
            <>
              <p className={classes.banned}>
                <strong>Utilizator blocat pana la: </strong>
                {moment(selectedUser.ban.endTime).format('llll')}
              </p>
              <CustomButton
                handler={handleOpenUnbanModal}
                text={'Deblocheaza utilizator'}
                primary
                size="small"
              />
            </>
          )}
          {(!selectedUser.ban || !selectedUser.ban.isValid) && (
            <CustomButton
              handler={handleOpenBanModal}
              text={'Blocheaza utilizator'}
              danger
              size={'small'}
            />
          )}
          {has(loggedUser, 'role') &&
            loggedUser.role.type === USER_ROLE_OWNER &&
            !selectedUser.ban && (
              <>
                {selectedUser.role &&
                  selectedUser.role.type !== USER_ROLE_OWNER && (
                    <CustomButton
                      handler={() => {}}
                      text={'Promoveaza Utilizator'}
                      primary
                      size={'small'}
                    />
                  )}
                {selectedUser.role &&
                  selectedUser.role.type !== USER_ROLE_USER && (
                    <CustomButton
                      handler={() => {}}
                      text={'Retrogradeaza Utilizator'}
                      danger
                      size={'small'}
                    />
                  )}
              </>
            )}
        </CardActions>
      </Card>
      {selectedUser._id && (
        <BanModal
          open={openBanModal}
          onClose={handleCloseBanModal}
          userId={selectedUser._id}
        />
      )}
      {selectedUser._id && (
        <UnbanModal
          open={openUnbanModal}
          onClose={handleCloseUnbanModal}
          userId={selectedUser._id}
        />
      )}
    </Box>
  );
}

User.propTypes = {
  loggedUser: PropTypes.object.isRequired,
};

export default User;
