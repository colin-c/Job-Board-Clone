import React, { useState, useEffect } from 'react';

const DatabaseConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState('loading');

  useEffect(() => {
    const checkDbConnection = async () => {
      try {
        const response = await fetch('/check-db-connection', {
          method: 'GET',
        });

        const text = await response.text();

        console.log('Response text:', text);

        setConnectionStatus(text);
      } catch (error) {
        console.error('Error checking database connection:', error);
        setConnectionStatus('error');
      }
    };

    checkDbConnection();
  }, []);

  return (
    <div>
      {connectionStatus === null ? (
        <p>Loading...</p>
      ) : connectionStatus === 'connected' ? (
        <p>Database is connected</p>
      ) : connectionStatus === 'unable to connect' ? (
        <p>Database is not connected</p>
      ) : (
        <p>Error checking database connection</p>
      )}
    </div>
  );
};

export default DatabaseConnectionStatus;
