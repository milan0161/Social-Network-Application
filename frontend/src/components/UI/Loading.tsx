import React from 'react';
import classes from './Loading.module.css';
const Loading: React.FC = () => {
  return (
    <div className={classes['spinner-container']}>
      <div className={classes['loading-spinner']}></div>
    </div>
  );
};

export default Loading;
