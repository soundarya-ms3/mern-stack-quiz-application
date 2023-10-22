import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const totalTime = 3;

  const getTime = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        return 0;
      } else {
        return prevSeconds + 1;
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(getTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (minutes === totalTime - 1) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  }, [minutes]);

  if (minutes === totalTime) {
    return <Navigate to={'/result'} replace={true}></Navigate>;
  }

  return (
    <div className='timer-container'>
      { showAlert && <h1 className='warning'>You have 1 minute remaining to submit your work!</h1>}
      <h1 className='timer'>
        {minutes <= 9 ? `0${minutes}` : minutes}:{seconds <= 9 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
}

export default Timer;
