import React, {useState, useEffect} from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notifications from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

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

      setNotification('Logged in user ' + tmpUser.username);
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setUser(tmpUser);
    } catch (e) {
      console.log('Error: Wrong credentials');
      setErrorNotification('Wrong username or password');
      setTimeout(() => {
        setErrorNotification(null);
      }, 5000);
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
    <Togglable buttonLabel='New Blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = (blogObj) => {
    try {
      blogService.create(blogObj);
      setNotification(`Created Blog "${blogObj.title}" by ${blogObj.author}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      blogService.getAll().then(blogs => setBlogs(blogs));
    } catch (e) {
      setErrorNotification('Failed to create blog. Try logging in again.');
      setTimeout(() => {
        setErrorNotification(null);
      }, 5000);
    }
  };

  const blogsList = () => (
    <div>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  );

  return (
    <div>
      <h2>BLOGS</h2>

      <Notifications.Notification message={notification} />
      <Notifications.ErrorNotification message={errorNotification} />

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