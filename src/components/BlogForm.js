import React, {useState} from 'react';

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearFields = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({title, author, url});
    clearFields();
  };

  return (
    <div className='blogDiv'>
      <h2>Create New</h2>

      <form onSubmit={addBlog}>
        Title: &nbsp;
        <input type="text" value={title} id="Title"
          onChange={({target}) => setTitle(target.value)}
        />

        <br />
        Author: &nbsp;
        <input type="text" value={author} id="Author"
          onChange={({target}) => setAuthor(target.value)}
        />

        <br />
          Url: &nbsp;
        <input type="text" value={url} id="Url"
          onChange={({target}) => setUrl(target.value)}
        />

        <br />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};
export default BlogForm;