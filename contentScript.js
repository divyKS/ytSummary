
chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {

    let currentVideo = obj.videoId;

    fetch('https://example.com/summarize-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoId: request.videoId
      })
    })
      .then(response => response.json())
      .then(summary => {
        // Send summary back to content script
        sendResponse({ summary });
      })
      .catch(error => {
        console.error(error);
        sendResponse({ error: 'An error occurred while summarizing the video.' });
      });

    return true;

});
