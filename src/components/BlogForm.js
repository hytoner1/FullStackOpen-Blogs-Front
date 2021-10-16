import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Togglable from './Togglable';

import {setNotification} from '../reducers/notificationReducer';
import {createBlog} from '../reducers/blogsReducer';

import blogService from '../services/blogs';

const BlogForm = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearFields = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({title, author, url});
      dispatch(createBlog(newBlog));
      dispatch(setNotification(`Created Blog "${title}" by ${author}`));
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      console.log(e);
      dispatch(setNotification('Failed to create blog. Try logging in again.', true));
    }
    clearFields();
  };

  if (!user) {
    return null;
  }

  return (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <h2>Create New</h2>

      <form onSubmit={addBlog}>
        <table>
          <tr>
            <td>
              Title: &nbsp;
            </td>
            <td>
              <input type="text" value={title} id="Title"
                onChange={({target}) => setTitle(target.value)}
              />
            </td>
            <br />
          </tr>
          <tr>
            <td>
              Author: &nbsp;
            </td>
            <td>
              <input type="text" value={author} id="Author"
                onChange={({target}) => setAuthor(target.value)}
              />
              <br />
            </td>
          </tr>
          <tr>
            <td>
              Url: &nbsp;
            </td>
            <td>
              <input type="text" value={url} id="Url"
                onChange={({target}) => setUrl(target.value)}
              />
            </td>
            <br />
          </tr>

          <tr>
            <td>
              <button type='submit'>Save</button>
            </td>
          </tr>
        </table>
      </form>
    </Togglable>
  );
};
export default BlogForm;