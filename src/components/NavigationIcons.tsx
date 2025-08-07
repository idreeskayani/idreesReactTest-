import React from 'react';
import './NavigationIcons.css';

interface NavigationIconsProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
}

const NavigationIcons: React.FC<NavigationIconsProps> = ({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onRefresh
}) => {
  return (
    <div className="navigation-icons">
      <button 
        className="nav-button" 
        title="Back" 
        disabled={!canGoBack}
        onClick={onBack}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      
      <button 
        className="nav-button" 
        title="Forward" 
        disabled={!canGoForward}
        onClick={onForward}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
      
      <button className="nav-button" title="Reload" onClick={onRefresh}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23,4 23,10 17,10"></polyline>
          <path d="M20.49,15a9,9,0,1,1-2.12-9.36L23,10"></path>
        </svg>
      </button>
    </div>
  );
};

export default NavigationIcons;