import React, {useState} from 'react';

const Blog = ({blog, likeBlog, removeBlog}) => {
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

  const handleLike = () => {
    //event.preventDefault();
    likeBlog({id: blog.id, newLikes: blog.likes + 1});
  };

  const handleDelete = () => {
    //event.preventDefault();
    removeBlog({id: blog.id, author: blog.author, name: blog.name});
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