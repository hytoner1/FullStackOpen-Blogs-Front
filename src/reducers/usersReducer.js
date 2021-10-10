const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_USERS':
  {
    return action.data;
  }
  default:
  {
    return state;
  }
  }
};

export const initializeUsers = (users) => {
  console.log('Users:', users);
  return async dispatch => {
    dispatch({
      type: 'SET_USERS',
      data: users
    });
  };
};

export default usersReducer;