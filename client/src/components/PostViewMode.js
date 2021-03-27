// System
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
// Material UI
import Box from '@material-ui/core/Box';
import {
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
// Icons
import PetsIcon from '@material-ui/icons/Pets';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
// Components
import UserInfo from './UserInfo';
import CustomButton from './CustomButton';
import { Carousel } from 'react-responsive-carousel';
// Actions
import {
  deletePost,
  markAsAdopted,
  updatePostStatus,
  getPost,
} from '../containers/Post/actions';
// Constants
import {
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_REJECTED,
} from '../containers/PostsPage/constants';
import {
  USER_ROLE_ADMIN,
  USER_ROLE_OWNER,
} from '../containers/Dashboard/constants';
// Styles
import styles from '../styles/PostStyles';
// Utils
import { get, isEmpty } from 'lodash';

function PostViewMode({ post, user, setEditMode }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = makeStyles(styles)();
  const { id } = useParams();

  useEffect(() => {
    if (isEmpty(post)) {
      dispatch(getPost(id));
    }
  }, [post, id]);

  const renderPostPictures = () => {
    if (!isEmpty(post)) {
      return post.pictures.map((picture, index) => {
        return (
          <img
            alt={`Anunt imagine ${index + 1}`}
            src={`${process.env.REACT_APP_API_ENDPOINT}/${picture}`}
            key={`${post.id}-${index}`}
          />
        );
      });
    }
  };

  const deletePostHandler = () => {
    dispatch(deletePost(post._id, history));
  };

  const updateStatus = (status) => {
    dispatch(updatePostStatus(post._id, status, history));
  };

  const setAsAdopted = () => {
    dispatch(markAsAdopted(post._id, history));
  };

  const switchToEditMode = () => {
    setEditMode(true);
  };

  let postedBy = '';
  if (get(post, 'postedBy.firstName') && get(post, 'postedBy.lastName')) {
    postedBy = post.postedBy.firstName + ' ' + post.postedBy.lastName;
  }

  let isPending;
  let isApproved;
  let isAdminOrOwner;
  let isNotAdopted;
  let postBelongsToUser;

  if (!isEmpty(post) && !isEmpty(user)) {
    isPending = post.status === STATUS_PENDING;
    isApproved = post.status === STATUS_APPROVED;
    isAdminOrOwner =
      user.role.type === USER_ROLE_ADMIN || user.role.type === USER_ROLE_OWNER;
    isNotAdopted = !post.isAdopted;
    postBelongsToUser = post.postedBy._id === user._id;
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.userInfoWrapper}>
        <Paper>
          {get(post, 'postedBy') && (
            <UserInfo showRole={false} user={post.postedBy} />
          )}
        </Paper>

        {isPending && isAdminOrOwner && (
          <Paper className={classes.postActions}>
            <CustomButton
              text={'Accepta'}
              success
              size={'small'}
              handler={() => updateStatus(STATUS_APPROVED)}
            />
            <CustomButton
              text={'Respinge'}
              danger
              size={'small'}
              handler={() => updateStatus(STATUS_REJECTED)}
            />
          </Paper>
        )}

        {isNotAdopted && postBelongsToUser && isApproved && (
          <Paper className={classes.postActions}>
            <CustomButton
              size={'small'}
              text={'Adoptat'}
              success
              handler={setAsAdopted}
            />
          </Paper>
        )}
      </Box>

      <Paper className={classes.post}>
        <Box className={classes.header}>
          <Carousel
            showStatus={false}
            autoFocus={false}
            autoPlay={false}
            showThumbs={false}
            className={classes.carousel}
          >
            {renderPostPictures()}
          </Carousel>
        </Box>

        <Box className={classes.postTitle}>
          <Typography component={'h1'}>
            <strong>{post.title}</strong>
          </Typography>
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
              <ListItemText primary={'Rasa'} secondary={post.breed} />
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={'Categoria'} secondary={post.category} />
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={'Localitatea'} secondary={post.location} />
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Postat'}
                secondary={moment(post.postedAt).fromNow()}
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

          <Typography component={'p'}>{post.description}</Typography>
        </Box>

        {user._id === post.postedBy._id && (
          <Box className={classes.actions}>
            {!isApproved && (
              <CustomButton
                text={'Editeaza'}
                dark
                size={'small'}
                handler={switchToEditMode}
              />
            )}
            {isNotAdopted && (
              <CustomButton
                text={'Sterge'}
                danger
                size={'small'}
                handler={deletePostHandler}
              />
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

PostViewMode.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default PostViewMode;
