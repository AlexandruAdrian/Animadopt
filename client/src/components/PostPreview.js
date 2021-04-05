// System
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router';
import moment from 'moment';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
// Icons
import PetsIcon from '@material-ui/icons/Pets';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from '@material-ui/icons/Category';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
// Actions
import { setSelectedPost } from '../containers/Dashboard/actions';
// Styles
import styles from '../styles/PostPreviewStyles';
// Utils
import { get } from 'lodash';

function PostPreview({ post, lastPostRef }) {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePostClick = () => {
    dispatch(setSelectedPost(post));
    history.push(`/dashboard/posts/post/${post._id}`);
  };

  let postedBy = '';
  if (get(post, 'postedBy.firstName') && get(post, 'postedBy.lastName')) {
    postedBy = post.postedBy.firstName + ' ' + post.postedBy.lastName;
  }

  return (
    <Grid item xs={12} md={6} lg={4} ref={lastPostRef}>
      <Fade in={true}>
        <Card
          classes={{
            root: classes.card,
          }}
        >
          <Box className={classes.header}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              autoPlay={false}
              autoFocus={false}
              className={classes.carousel}
            >
              {get(post, 'pictures') &&
                post.pictures.length &&
                post.pictures.map((picture, index) => {
                  return (
                    <img
                      src={`${process.env.REACT_APP_API_ENDPOINT}/${picture}`}
                      key={`${post.id}-${index}`}
                      className={classes.image}
                      alt={'post image'}
                    />
                  );
                })}
            </Carousel>
          </Box>
          <CardActionArea onClick={handlePostClick}>
            <CardContent>
              <Typography component="p" className={classes.title}>
                {post.title}
              </Typography>

              <List className={classes.detailList}>
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
                  <ListItemText
                    primary={'Categoria'}
                    secondary={post.category}
                  />
                </ListItem>

                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={'Localitatea'}
                    secondary={post.location}
                  />
                </ListItem>
              </List>

              <List className={classes.footerList}>
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
            </CardContent>
          </CardActionArea>
        </Card>
      </Fade>
    </Grid>
  );
}

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostPreview;
