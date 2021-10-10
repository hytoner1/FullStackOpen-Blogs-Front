import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Switch, Route, useRouteMatch/*, Link, useParams, useHistory*/
} from 'react-router-dom';

import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import UserList from './components/UserList';

import blogService from './services/blogs';
import usersService from './services/users';

import {setUser} from './reducers/userReducer';
import {initializeBlogs} from './reducers/blogsReducer';
import {initializeUsers} from './reducers/usersReducer';


const App = () => {
  const blogs = useSelector(state => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    );

    usersService.getAll().then(users =>
      dispatch(initializeUsers(users))
    );

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const tmpUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(tmpUser));
      blogService.setToken(tmpUser.token);
    }
  }, []);

  const match = useRouteMatch('/blogs/:id');
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null;

  return (
    <div className="container">
      <Header />

      <h2 style={{paddingTop: '20px', paddingBottom: '10px'}}>BLOGS APP</h2>

      <Notification />
      <LoginForm />

      <Switch>
        <Route path='/users'>
          <UserList />
        </Route>

        <Route path='/blogs/:id'>
          <Blog blog={blog} showByDefault={true}/>
        </Route>

        <Route path='/'>
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;