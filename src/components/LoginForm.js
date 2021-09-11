import React, {useState} from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({handleLogin}) => {
  LoginForm.propTypes = {handleLogin: PropTypes.func.isRequired};

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
    handleLogin({username, password});
  };

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