const userReducer = (state = null, action) => {

  switch (action.type) {
  case 'SET_USER':
  {
    console.log(action.user);
    return action.user;
  }
  case 'CLEAR_USER':
  {
    return null;
  }
  default:
  {
    return state;
  }
  }
};

export const setUser = (user) => {
  console.log('setUser:', user);
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user: user
    });
  };
};

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  };
};

export default userReducer;