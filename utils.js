// this function would be used in popup.js
export async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true, // to search in current window only
        active: true // to search in the current window's active tab only
    });
    return tabs[0];
}
