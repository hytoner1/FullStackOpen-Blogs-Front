import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import LogoutBlock from './components/LogoutBlock';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';

import {setNotification} from './reducers/notificationReducer';
import {setUser} from './reducers/userReducer';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const createBlogBlock = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create(blogObj);
      dispatch(setNotification(`Created Blog "${blogObj.title}" by ${blogObj.author}`));
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (e) {
      dispatch(setNotification('Failed to create blog. Try logging in again.', true));
    }
  };

  const likeBlog = async ({id, newLikes}) => {
    try {
      blogService.update(id, {likes: newLikes});
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (e) {
      dispatch(setNotification('Failed to add a like. Try logging in again.', true, 5));
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
      dispatch(setNotification(`Failed to remove blog with ID ${id}`, true, 5));
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
      <LogoutBlock />

      {user === null
        ? null
        : createBlogBlock()
      }

      {user === null
        ? <LoginForm/>
        : blogsList()
      }
    </div>
  );
};

export default App;