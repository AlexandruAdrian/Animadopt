// System
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';
// Material UI
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
// Icons
import PetsIcon from '@material-ui/icons/Pets';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
// Components
import UserInfo from '../../components/UserInfo';
import CustomButton from '../../components/CustomButton';
// Actions
import {
  getPost,
  deletePost,
  updatePostStatus,
  markAsAdopted,
} from './actions';
// Styles
import styles from '../../styles/PostStyles';
// Constants
import {
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_REJECTED,
} from '../PostsPage/constants';
import { USER_ROLE_ADMIN, USER_ROLE_OWNER } from '../Dashboard/constants';
// Utils
import { get } from 'lodash';

function Post({ selectedPost, loggedUser }) {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!selectedPost) {
      dispatch(getPost(id));
    }
  }, [dispatch]);

  const deletePostHandler = () => {
    dispatch(deletePost(selectedPost._id, history));
  };

  const updateStatus = (status) => {
    dispatch(updatePostStatus(selectedPost._id, status, history));
  };

  const setAsAdopted = () => {
    dispatch(markAsAdopted(selectedPost._id, history));
  };

  const postedBy =
    selectedPost.postedBy.firstName + ' ' + selectedPost.postedBy.lastName;
  return (
    <Box className={classes.postPage}>
      <Box className={classes.container}>
        <Box className={classes.userInfoWrapper}>
          <Paper className={classes.userInfo}>
            {get(selectedPost, 'postedBy') && (
              <UserInfo showRole={false} user={selectedPost.postedBy} />
            )}
          </Paper>

          {selectedPost.status === STATUS_PENDING &&
            (loggedUser.role.type === USER_ROLE_ADMIN ||
              loggedUser.role.type === USER_ROLE_OWNER) && (
              <Paper className={classes.postActions}>
                <CustomButton
                  text={'Accepta'}
                  success
                  handler={() => updateStatus(STATUS_APPROVED)}
                />
                <CustomButton
                  text={'Respinge'}
                  danger
                  handler={() => updateStatus(STATUS_REJECTED)}
                />
              </Paper>
            )}

          {!selectedPost.isAdopted &&
            selectedPost.postedBy._id === loggedUser._id &&
            selectedPost.status !== STATUS_PENDING &&
            selectedPost.status !== STATUS_REJECTED && (
              <Paper className={classes.postActions}>
                <CustomButton text={'Adoptat'} success handler={setAsAdopted} />
              </Paper>
            )}
        </Box>

        <Paper className={classes.post}>
          <Box className={classes.header}>
            <Carousel
              showStatus={false}
              autoFocus={false}
              autoPlay={false}
              className={classes.carousel}
            >
              {get(selectedPost, 'pictures') &&
                selectedPost.pictures.map((picture, index) => {
                  return (
                    <img
                      src={`${process.env.REACT_APP_API_ENDPOINT}/${picture}`}
                      key={`${selectedPost.id}-${index}`}
                    />
                  );
                })}
            </Carousel>
          </Box>

          <Box className={classes.generalInformation}>
            <Typography component={'h2'}>
              <strong>Informatii generale</strong>
            </Typography>

            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText primary={'Rasa'} secondary={selectedPost.breed} />
              </ListItem>

              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary={'Categoria'}
                  secondary={selectedPost.category}
                />
              </ListItem>

              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary={'Localitatea'}
                  secondary={selectedPost.location}
                />
              </ListItem>

              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={'Postat'}
                  secondary={moment(selectedPost.postedAt).fromNow()}
                />
              </ListItem>

              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={'Postat de'} secondary={postedBy} />
              </ListItem>
            </List>
          </Box>

          <Box className={classes.description}>
            <Typography component={'h2'}>
              <strong>Descriere anunt</strong>
            </Typography>

            <Typography component={'p'}>{selectedPost.description}</Typography>
          </Box>

          {loggedUser._id === selectedPost.postedBy._id && (
            <Box className={classes.actions}>
              <CustomButton
                text={'Sterge'}
                danger
                size={'small'}
                handler={deletePostHandler}
              />
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

Post.propTypes = {
  selectedPost: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
};

export default Post;
