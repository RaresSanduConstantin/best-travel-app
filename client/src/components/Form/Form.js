import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, deletePostId } from '../../actions/posts';
import imgs from '../../helpers/img'

export const Form = () => {
  const classes = useStyles();

  const currentId = useSelector((state) => state.postId)

  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));

  const user = JSON.parse(localStorage.getItem('profile'))

  
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: `data:image/png;base64,${imgs}`,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handlerSumit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({...postData, name: user?.result?.name}));
    }
    clear();
  };

  const clear = () => {
    dispatch(deletePostId())
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile:''
    });
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' aling='center'>
        Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handlerSumit}
      >
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
