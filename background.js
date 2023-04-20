// we also have to think about how our extension is even going to know when we've navigated to a new web page. 
// And we need to know this so the content script knows to execute logic to add the plus icon

//onUpdated would work when the tab is reloaded/created/removed


//  YT URL - https://www.youtube.com/watch? v=bi10mJtk0xU


// because of tabID it will be triggered only when the specified page in updated otherwise its for all tabs
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1]; // we will use this as a unique id and keep it in storage
      const urlParameters = new URLSearchParams(queryParameters);
  
      // send this message of the new url to the contentScript
      // tabID and a unique object
      chrome.tabs.sendMessage(tabId, {
        type: "NEW", // type of event new video event
        videoId: urlParameters.get("v"), // to grab the things after the v= only
        // random: "random" // and now the contextScript would have acces to random  
      });
    }
  });
  