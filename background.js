let currentTabId = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (currentTabId !== null && currentTabId !== activeInfo.tabId) {
    chrome.tabs.sendMessage(currentTabId, { command: "pauseVideo" });
  }
  currentTabId = activeInfo.tabId;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.startsWith("https://www.youtube.com/")) {
    currentTabId = tabId;
  }
});
