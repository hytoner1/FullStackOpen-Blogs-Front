import React from 'react';
import {useSelector} from 'react-redux';

import Navigation from './Navigation';
import LogoutBlock from './LogoutBlock';

const Header = () => {
  const user = useSelector(state => state.user);

  const headerStyle = {
    padding: 5,
    background: 'lightgray',
    display: 'flex',
    justifyContent: 'space-between'
  };

  if (!user) {
    return null;
  }

  return (
    <div style={headerStyle}>
      <Navigation />
      <LogoutBlock />
    </div>
  );
};

export default Header;