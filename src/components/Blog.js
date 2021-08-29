import React, {useState} from 'react';

const Blog = ({blog, likeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [visible, setVisible] = useState(true);

  const handleLike = () => {
    event.preventDefault();
    likeBlog({id: blog.id, newLikes: blog.likes + 1});
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