// we want to know if the current url is youtube, if it is we need to show the bookmarks or show a different message if it is not a youtube page
// see from the google documentation
// export since we want to export it in popup.js
export async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}

