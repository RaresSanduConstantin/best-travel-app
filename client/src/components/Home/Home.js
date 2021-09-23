import React, { useEffect, useState } from 'react';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts, getPostBySearch } from '../../actions/posts';
import Paginate from '../Pagination/Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim().length > 0 || tags.length > 0) {
      dispatch(getPostBySearch({ search, tags: tags.join(',') }, history));

      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      history.push('/');
    }
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.search}
                color='primary'
                variant='contained'
              >
                Search
              </Button>
            </AppBar>
            <Form />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
