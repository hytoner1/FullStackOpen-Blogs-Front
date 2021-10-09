import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {clearUser} from '../reducers/userReducer';

const LogoutBlock = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  return (
    <div>
       User: {user.name} &nbsp;
      <button onClick={() => {
        dispatch(clearUser());
        window.localStorage.removeItem('loggedUser');
      }}>
        Logout
      </button>
    </div>
  );
};

export default LogoutBlock;