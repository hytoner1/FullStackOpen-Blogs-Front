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
import User from './components/User';

import blogService from './services/blogs';
import usersService from './services/users';

import {setUser} from './reducers/userReducer';
import {initializeBlogs} from './reducers/blogsReducer';
import {initializeUsers} from './reducers/usersReducer';


const App = () => {
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users);

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

  const blogMatch = useRouteMatch('/blogs/:id');
  const selectedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null;

  const userMatch = useRouteMatch('/users/:id');
  const selectedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null;

  return (
    <div className="container">
      <Header />

      <h2 style={{paddingTop: '20px', paddingBottom: '10px'}}>BLOGS APP</h2>

      <Notification />
      <LoginForm />

      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={selectedBlog} showByDefault={true}/>
        </Route>

        <Route path='/users/:id'>
          <User user={selectedUser} />
        </Route>

        <Route path='/users'>
          <UserList />
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