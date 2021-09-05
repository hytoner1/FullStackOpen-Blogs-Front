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

  const [visible, setVisible] = useState(true);

  const handleLike = () => {
    event.preventDefault();
    likeBlog({id: blog.id, newLikes: blog.likes + 1});
  };

  const handleDelete = () => {
    event.preventDefault();
    removeBlog({id: blog.id, author: blog.author, name: blog.name});
  };

  return (
    <div>
      <div style={visible ? blogStyle : {display: 'none'}}>
        {blog.title} - {blog.author} &nbsp;
        <button onClick={() => setVisible(false)}>
          Hide
        </button>

        <br />
        {blog.url}

        <br />
        Likes: {blog.likes} &nbsp;
        <button onClick={() => handleLike()}>
          Like
        </button>

        <br />
        {blog.user.name}

        <br />
        <button style={deleteBtnStyle} onClick={() => handleDelete()}>
          Remove
        </button>
      </div>

      <div style={visible ? {display: 'none'} : blogStyle}>
        {blog.title} - {blog.author} &nbsp;
        <button onClick={() => setVisible(true)}>
          Show
        </button>
      </div>
    </div>

  );

};

export default Blog;