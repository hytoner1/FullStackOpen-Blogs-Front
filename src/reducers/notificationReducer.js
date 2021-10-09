let idTime = 0;

const notificationReducer = (state = {text: 'Welcome', isError: false, timeout: 5}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
  {
    return action.notification;
  }
  case 'CLEAR_NOTIFICATION':
  {
    return {text: ''};
  }
  default:
  {
    return state;
  }
  }
};

export const setNotification = (text, isError = false, timeout) => {
  console.log('setNotification:', text, isError, timeout);
  return async dispatch => {
    clearTimeout(idTime);

    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {text, isError},
    });

    idTime = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  };
};

export default notificationReducer;