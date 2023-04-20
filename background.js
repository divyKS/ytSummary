
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "summarize") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { type: "summarize" }, (response) => {
        sendResponse(response);
      });
    });
    return true; 
  }
});

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url && tab.url.includes("youtube.com/watch")) {
//     const queryParameters = tab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "summarize",
//       videoId: urlParameters.get("v"),
//     });
//   }
// });
