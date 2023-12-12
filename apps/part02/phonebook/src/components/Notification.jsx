import React from 'react';
import './notification.css'

export default function Notification({message,isError}) {

    const notificationStyle = {
        fontStyle: 'bold',
        fontSize: 16,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 20,
      }

  return (
    <div style={notificationStyle} className={`${isError ? 'error' : 'success'}`}>
      <p>{message}</p>
    </div>
  );
}
