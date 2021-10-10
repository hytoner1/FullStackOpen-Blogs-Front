import React from 'react';
import {useSelector} from 'react-redux';
import {
  Link
} from 'react-router-dom';

const Navigation = () => {
  const user = useSelector(state => state.user);

  const padding = {
    paddingRight: 10,
    paddingLeft: 5
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Link to='/' style={padding}>BLOGS</Link>
      <Link to='/users' style={padding}>USERS</Link>
    </div>
  );
};

export default Navigation;