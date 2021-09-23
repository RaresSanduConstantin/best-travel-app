import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode'
import { getPersonalPostsByCreator } from '../../actions/posts';

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()

  const logout = () => {
    dispatch({type: LOGOUT})
    history.push('/')
    setUser(null)
  }

  const getPersonalPosts = (user) => {

    console.log('user', user)
    if(user.result.googleId) {

      dispatch(getPersonalPostsByCreator(user.result.googleId));
    } else {
      dispatch(getPersonalPostsByCreator(user.result._id));
    }
  }

  useEffect(() => {
    const token = user?.token;

    // todo JWT
    if(token) {
      const decodedToken = decode(token)

      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout()
      }
    }


    setUser(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line
  }, [location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.container}>
      <img
          className={classes.image}
          src={memoriesText}
          alt='memoriesText'
          height='40'
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='memories'
          height='40'
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile} >
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <div style={{display:'flex', flexDirection:'column'}}>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Typography style={{cursor:'pointer', fontSize:'1em'}} className={classes.userName} onClick={() => getPersonalPosts(user)}>
              See my posts
            </Typography>
            </div>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
