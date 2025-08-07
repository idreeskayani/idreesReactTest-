import React from 'react';
import './TabBar.css';

interface Tab {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  isNew?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  onTabClick: (tabId: string) => void;
  onNewTab: () => void;
  onCloseTab: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, onTabClick, onNewTab, onCloseTab }) => {
  const handleCloseClick = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onCloseTab(tabId);
  };

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.isActive ? 'active' : ''} ${tab.isNew ? 'new-tab-animation' : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          <div className="tab-content">
            <div className="tab-favicon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <span className="tab-title">{tab.title}</span>
            <button 
              className="tab-close"
              onClick={(e) => handleCloseClick(e, tab.id)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M3,3 L9,9 M9,3 L3,9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <button className="new-tab-button" title="New tab" onClick={onNewTab}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default TabBar;