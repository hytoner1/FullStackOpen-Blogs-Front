import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import LoginForm from './components/LoginForm';
import LogoutBlock from './components/LogoutBlock';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';

import blogService from './services/blogs';

import {setUser} from './reducers/userReducer';
import {initializeBlogs} from './reducers/blogsReducer';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const tmpUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(tmpUser));
      blogService.setToken(tmpUser.token);
    }
  }, []);

  return (
    <div>
      <h2>BLOGS</h2>

      <Notification />
      <LogoutBlock />

      <BlogForm/>

      <LoginForm />
      <BlogList />
    </div>
  );
};

export default App;