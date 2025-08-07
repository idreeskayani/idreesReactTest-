import React, { useState } from 'react';
import WindowControls from './WindowControls';
import TabBar from './TabBar';
import AddressBar from './AddressBar';
import NavigationIcons from './NavigationIcons';
import './ChromeBrowser.css';

interface Tab {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  isNew?: boolean;
}

const ChromeBrowser: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'New Tab', url: 'https://example.com', isActive: true },
    { id: '2', title: 'GitHub', url: 'https://github.com', isActive: false },
  ]);
  const [history, setHistory] = useState<string[]>(['https://example.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [nextTabId, setNextTabId] = useState(3);

  const handleTabClick = (tabId: string) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId,
      isNew: false
    })));
  };

  const handleNewTab = () => {
    const newTab: Tab = {
      id: nextTabId.toString(),
      title: 'New Tab',
      url: 'chrome://newtab',
      isActive: true,
      isNew: true
    };
    
    setTabs(prevTabs => [
      ...prevTabs.map(tab => ({ ...tab, isActive: false, isNew: false })),
      newTab
    ]);
    setNextTabId(prev => prev + 1);
    
    // Remove the isNew flag after animation
    setTimeout(() => {
      setTabs(prevTabs => prevTabs.map(tab => ({ ...tab, isNew: false })));
    }, 300);
  };

  const handleCloseTab = (tabId: string) => {
    const tabToClose = tabs.find(tab => tab.id === tabId);
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    
    if (tabs.length === 1) return; // Don't close the last tab
    
    let newActiveTabId = '';
    if (tabToClose?.isActive) {
      // If closing active tab, activate the next tab or previous if it's the last
      const nextTab = tabs[tabIndex + 1] || tabs[tabIndex - 1];
      newActiveTabId = nextTab.id;
    }
    
    setTabs(prevTabs => 
      prevTabs
        .filter(tab => tab.id !== tabId)
        .map(tab => ({
          ...tab,
          isActive: newActiveTabId ? tab.id === newActiveTabId : tab.isActive
        }))
    );
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      updateActiveTabUrl(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      updateActiveTabUrl(history[newIndex]);
    }
  };

  const handleRefresh = () => {
    // Simulate refresh animation
    const activeTab = tabs.find(tab => tab.isActive);
    if (activeTab) {
      updateActiveTabUrl(activeTab.url);
    }
  };

  const updateActiveTabUrl = (newUrl: string) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.isActive ? { ...tab, url: newUrl } : tab
      )
    );
  };

  const handleUrlChange = (newUrl: string) => {
    updateActiveTabUrl(newUrl);
    
    // Add to history if it's different from current
    if (history[historyIndex] !== newUrl) {
      const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };
  const activeTab = tabs.find(tab => tab.isActive);
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  return (
    <div className="chrome-browser">
      <div className="window-header">
        <div className="window-header-left">
          <TabBar 
            tabs={tabs} 
            onTabClick={handleTabClick} 
            onNewTab={handleNewTab}
            onCloseTab={handleCloseTab}
          />
        </div>
        <WindowControls />
      </div>
      
      <div className="chrome-toolbar">
        <NavigationIcons 
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onBack={handleBack}
          onForward={handleForward}
          onRefresh={handleRefresh}
        />
        <AddressBar 
          url={activeTab?.url || 'https://example.com'} 
          onUrlChange={handleUrlChange}
        />
        <div className="toolbar-actions">
          <button className="toolbar-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
          </button>
          <button className="toolbar-button menu-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      <div className="content-area">
        <div className="page-content">
          <h2>{activeTab?.title || 'New Tab'}</h2>
          <p>URL: {activeTab?.url || 'https://example.com'}</p>
          <div className="page-info">
            <p>History: {history.length} pages</p>
            <p>Current position: {historyIndex + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChromeBrowser;