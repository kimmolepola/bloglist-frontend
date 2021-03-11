import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div style={{ marginBottom: 15, marginTop: 15 }}>
      {notification.msgClass === 'success' ? <Message positive>{notification.message}</Message> : <Message negative>{notification.message}</Message>}
    </div>
  );
};
/* eslint-enable react/prop-types */

export default connect((state) => ({ notification: state.notification }))(Notification);
