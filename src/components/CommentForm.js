import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {setNotification} from '../reducers/notificationReducer';
import {commentBlog} from '../reducers/blogsReducer';

import blogService from '../services/blogs';

const CommentForm = ({id}) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const addComment = async (event) => {
    event.preventDefault();
    try {
      const newComment = await blogService.comment({id, text});
      console.log(newComment);
      dispatch(commentBlog(newComment));
    } catch (e) {
      console.log(e);
      dispatch(setNotification('Failed to create a comment. Try logging in again.', true));
    }

    setText('');
  };

  return (
    <form onSubmit={addComment}>
      <input type="text" value={text} id="Text"
        onChange={({target}) => setText(target.value)}
      />
      <button type='submit'>Save</button>
    </form>
  );
};
export default CommentForm;