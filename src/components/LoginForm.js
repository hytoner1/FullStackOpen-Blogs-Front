import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import blogService from '../services/blogs';
import loginService from '../services/login';

import {setNotification} from '../reducers/notificationReducer';
import {setUser} from '../reducers/userReducer';

const LoginForm = () => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    try {
      const tmpUser = await loginService.login({username, password});
      window.localStorage.setItem('loggedUser', JSON.stringify(tmpUser));
      blogService.setToken(tmpUser.token);

      dispatch(setNotification(`Logged in user ${tmpUser.username}`));
      dispatch(setUser(tmpUser));
    } catch (e) {
      console.log('Error: Wrong credentials');
      dispatch(setNotification('Wrong username or password', true));
    }
  };

  if (user) {
    return null;
  }

  return (
    <form onSubmit={login} id='form_login'>
      <div>
        username &nbsp;
        <input type="text" value={username} id="username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password &nbsp;
        <input type="password" value={password} id="password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='button_login'>login</button>
    </form>
  );
};

export default LoginForm;