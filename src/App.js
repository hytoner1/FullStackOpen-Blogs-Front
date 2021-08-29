import React, {useState, useEffect} from 'react';

import Blog from './components/Blog';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const tmpUser = await loginService.login({
        username, password
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(tmpUser));

      blogService.setToken(tmpUser.token);

      setUser(tmpUser);
      setUsername('');
      setPassword('');
    } catch (e) {
      console.log('Error: Wrong credentials');
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username &nbsp;
        <input type="text" value={username} name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password &nbsp;
        <input type="password" value={password} name="Password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
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

  const createNewBlock = () => (
    <div>
      <h2>Create New</h2>

      Title: &nbsp;
      <input type="text" value={title} name="Title"
        onChange={({target}) => setTitle(target.value)}
      />

      <br />
      Author: &nbsp;
      <input type="text" value={author} name="Author"
        onChange={({target}) => setAuthor(target.value)}
      />

      <br />
      Url: &nbsp;
      <input type="text" value={url} name="Url"
        onChange={({target}) => setUrl(target.value)}
      />

      <br />
      <button onClick={() => console.log('Creating new')}>
        Create
      </button>
    </div>
  );

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

      {user === null
        ? null
        : logoutBlock()
      }
      <hr/>
      {user === null
        ? loginForm()
        : blogsList()
      }
      <hr />
      {user === null
        ? null
        : createNewBlock()
      }
    </div>
  );
};

export default App;