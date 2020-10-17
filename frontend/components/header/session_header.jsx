import React from 'react';
import { Link } from 'react-router-dom';

const SessionHeader = () => {
  return (
    <header className="session-header ">
      <div className="session-header__container">
        <Link to="/">Artist Shack</Link>
      </div>
    </header>
  );
};

export default SessionHeader;
