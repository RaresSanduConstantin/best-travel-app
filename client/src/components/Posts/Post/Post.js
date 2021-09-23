import React from 'react';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost, getPostId } from '../../../actions/posts';
import imgs from '../../../helpers/img';

import {useHistory} from 'react-router-dom'
import Likes from '../../Likes/Likes'

const Post = ({ post }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  const history = useHistory()
  const openPost = () => {
    history.push(`/posts/${post._id}`)
  }


  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase 
      className={classes.cardAction}
      onClick={openPost}
      > 
     
      <CardMedia
        className={classes.media}
        image={post.selectedFile || `data:image/png;base64,${imgs}`}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      </ButtonBase>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: 'white', zIndex:'999999', cursor: 'pointer' }}
            size='small'
            onClick={() => {
              dispatch(getPostId(post._id));
            }}
          >
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>
      )}
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes post={post} />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
