// System
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';
import axios from 'axios';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// Icons
import PetsIcon from '@material-ui/icons/Pets';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from '@material-ui/icons/Category';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
// Helpers
import { getLocalStorageItem } from '../helpers/localStorage';
// Styles
import styles from '../styles/PostStyles';

function PostPreview({ post }) {
  const classes = makeStyles(styles)();
  const [postedBy, setPostedBy] = useState({});
  useEffect(() => {
    (async () => {
      const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/users/${post.postedBy}`;
      const config = {
        headers: {
          Authorization: `Bearer ${getLocalStorageItem('token')}`,
        },
      };

      const {
        data: { user },
      } = await axios.get(API_ENDPOINT, config);
      setPostedBy({
        fullName: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
      });
    })();
  }, []);

  return (
    <Card>
      <Box className={classes.header}>
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoplay={false}
          autoFocus={false}
          className={classes.carousel}
        >
          {post.pictures.map((picture, index) => {
            return (
              <img
                src={`${process.env.REACT_APP_API_ENDPOINT}/${picture}`}
                key={`${post.id}-${index}`}
                className={classes.image}
              />
            );
          })}
        </Carousel>
      </Box>
      <CardActionArea>
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
              <ListItemText primary={'Categoria'} secondary={post.category} />
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={'Localitatea'} secondary={post.location} />
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
              <ListItemText
                primary={'Postat de'}
                secondary={postedBy.fullName}
              />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Vezi mai mult
        </Button>
      </CardActions>
    </Card>
  );
}

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostPreview;
