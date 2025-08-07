import React from 'react';
import './WindowControls.css';

const WindowControls: React.FC = () => {
  return (
    <div className="window-controls">
      <button className="control-button minimize" title="Minimize">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M0,5 L10,5" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
      <button className="control-button maximize" title="Maximize">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <rect x="0" y="0" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
      <button className="control-button close" title="Close">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M0,0 L10,10 M10,0 L0,10" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
    </div>
  );
};

export default WindowControls;