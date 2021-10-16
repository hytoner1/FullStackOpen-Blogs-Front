import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Link
} from 'react-router-dom';

import CommentForm from './CommentForm';

import {setNotification} from '../reducers/notificationReducer';
import {likeBlog, removeBlog} from '../reducers/blogsReducer';

import blogService from '../services/blogs';

import {Table} from 'react-bootstrap';

const Blog = ({blogId}) => {
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === blogId);

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

  if (!blog || !user) {
    return null;
  }

  return (
    <div style={blogStyle} className='blogShown' id='blog'>
      <h3>{blog.title} - {blog.author} &nbsp;</h3>

      <Link to={blog.url}>{blog.url}</Link>
      <br />

      Added by {blog.user.name}
      <br />
      <br />

      Likes: {blog.likes} &nbsp;
      <button onClick={handleLike} id='button_like'>
        Like
      </button>
      <br />
      <br />

      <b>Comments</b>

      <CommentForm id={blog.id}/>

      <Table striped>
        <tbody>
          {blog.comments
            .map(c =>
              <tr key={c.id}>
                <td>
                  {c.text}
                </td>
              </tr>
            )}
        </tbody>
      </Table>
      <br />

      <button style={deleteBtnStyle} onClick={handleDelete} id='button_remove'>
        Remove
      </button>
    </div>
  );
};

export default Blog;