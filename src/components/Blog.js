import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {setNotification} from '../reducers/notificationReducer';
import {likeBlog, removeBlog} from '../reducers/blogsReducer';

import blogService from '../services/blogs';

const Blog = ({blog}) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const deleteBtnStyle = {
    backgroundColor: 'red',
    padding: 2,
    margin: 2,
    borderRadius: '4px'
  };

  const [visible, setVisible] = useState(false);

  const handleLike = async () => {
    try {
      await blogService.update(blog.id, {likes: blog.likes + 1});
      dispatch(likeBlog(blog.id));
    } catch (e) {
      console.log(e);
      dispatch(setNotification('Failed to add a like. Try logging in again.', true));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
      return;
    }

    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
    } catch (e) {
      console.log(e);
      dispatch(setNotification(`Failed to remove blog with ID ${blog.id}`, true));
    }
  };

  if (visible) {
    return (
      <div style={blogStyle} className='blogShown' id='blog'>
        {blog.title} - {blog.author} &nbsp;
        <button onClick={() => setVisible(false)}>
          Hide
        </button>

        <br />
        {blog.url}

        <br />
        Likes: {blog.likes} &nbsp;
        <button onClick={handleLike} id='button_like'>
          Like
        </button>

        <br />
        {blog.user.name}

        <br />
        <button style={deleteBtnStyle} onClick={handleDelete} id='button_remove'>
          Remove
        </button>
      </div>
    );
  }
  else {
    return (
      <div style={blogStyle} className='blogHidden' id='blog'>
        {blog.title} - {blog.author} &nbsp;
        <button onClick={() => setVisible(true)} className='showButton' id='button_show'>
          Show
        </button>
      </div>
    );
  }
};

export default Blog;