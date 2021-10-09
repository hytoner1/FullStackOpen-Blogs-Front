import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

import {setNotification} from './reducers/notificationReducer';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  //const [notification, setNotification] = useState(null);
  //const [errorNotification, setErrorNotification] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const tmpUser = JSON.parse(loggedUserJSON);
      setUser(tmpUser);
      blogService.setToken(tmpUser.token);
    }
  }, []);

  const handleLogin = async (loginInfo) => {
    try {
      const tmpUser = await loginService.login(loginInfo);
      window.localStorage.setItem('loggedUser', JSON.stringify(tmpUser));
      blogService.setToken(tmpUser.token);
      dispatch(setNotification(`Logged in user ${tmpUser.username}`, false, 5));
      setUser(tmpUser);
    } catch (e) {
      console.log('Error: Wrong credentials');
      dispatch(setNotification('Wrong username or password', true, 5));
    }
  };

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin}/>
  );

  const logoutBlock = () => (
    <div>
      User: {user.name} &nbsp;
      <button onClick={() => {
        setUser(null);
        window.localStorage.removeItem('loggedUser');
      }}>
        Logout
      </button>
    </div>
  );

  const createBlogBlock = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create(blogObj);
      setNotification(`Created Blog "${blogObj.title}" by ${blogObj.author}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (e) {
      //setErrorNotification('Failed to create blog. Try logging in again.');
      //setTimeout(() => {
      //  setErrorNotification(null);
      //}, 5000);
    }
  };

  const likeBlog = async ({id, newLikes}) => {
    try {
      blogService.update(id, {likes: newLikes});
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (e) {
      //setErrorNotification('Failed to add a like. Try logging in again.');
      //setTimeout(() => {
      //  setErrorNotification(null);
      //}, 5000);
    }
  };

  const removeBlog = async ({id, title, author}) => {
    if (!window.confirm(`Do you want to remove ${title} by ${author}?`)) {
      return;
    }

    try {
      await blogService.remove(id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (e) {
      //setErrorNotification('Failed to remove blog with ID ' + id);
      //setTimeout(() => {
      //  setErrorNotification(null);
      //}, 5000);
    }
  };

  const blogsList = () => (
    <div>
      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
          )
      }
    </div>
  );

  return (
    <div>
      <h2>BLOGS</h2>

      <Notification />

      {user === null
        ? null
        : logoutBlock()
      }

      {user === null
        ? null
        : createBlogBlock()
      }

      {user === null
        ? loginForm()
        : blogsList()
      }
    </div>
  );
};

export default App;