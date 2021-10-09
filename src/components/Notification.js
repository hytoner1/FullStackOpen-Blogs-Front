import React from 'react';
import {connect} from 'react-redux';

const Notification = (props) => {
  console.log('Notification:', props);
  if (props.text === '') {
    return null;
  }

  const notificationColor = props.isError ? 'red' : 'green';
  const notificationStyle = {
    color: notificationColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  return (
    <div style={notificationStyle}>
      {props.text}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    text: state.notification.text,
    isError: state.notification.isError
  };
};

export default connect(mapStateToProps)(Notification);