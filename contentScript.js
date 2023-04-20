chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "summarize") {
    const videoId = sender.videoId;

    fetch(`https://example.com/summarize?videoId=${videoId}`)
      .then((response) => response.json())
      .then((summary) => {
        sendResponse({ summary: summary });
      })
      .catch((error) => {
        sendResponse({ error: error });
      });
      
    return true; 
  }
});
