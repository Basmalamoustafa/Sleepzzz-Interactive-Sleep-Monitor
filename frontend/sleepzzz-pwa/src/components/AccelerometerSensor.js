import React, { useState, useEffect } from 'react';

function AccelerometerSensor ()  {
  const [acceleration, setAcceleration] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  useEffect(() => {

    if ('Accelerometer' in window) {

        navigator.permissions.query({ name: 'accelerometer' }).then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
            const acl = new window.Accelerometer({ frequency: 60 });

          acl.addEventListener('reading', () => {
            setAcceleration({
              x: acl.x,
              y: acl.y,
              z: acl.z
            });
          });

          acl.addEventListener('error', (e) => {
            console.error('Error with accelerometer: ', e.error.name);
          });

          acl.start();

          // Cleanup on unmount
          return () => {
            acl.stop();
          };
        } else {
          console.error('Permission to access accelerometer is not granted');
        }
      }).catch((e) => {
        console.error('Error checking permission: ', e);
      });
    } else {
      console.error('Accelerometer API is not supported on this device');
    }
  }, []);

  return (
    <div>
      <h3>Accelerometer Data</h3>
      <p>Acceleration X: {acceleration.x}</p>
      <p>Acceleration Y: {acceleration.y}</p>
      <p>Acceleration Z: {acceleration.z}</p>
    </div>
  );
};

export default AccelerometerSensor;
