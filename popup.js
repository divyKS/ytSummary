// adding a new bookmark row to the popup
import { getActiveTabURL } from "./utils.js";

const summarizeButton = document.getElementById('summarizeButton');
const summaryDiv = document.getElementById('summary');

// Add a click event listener to the summarize button.
summarizeButton.addEventListener('click', () => {
  // Get the YouTube video ID from the input field.
  const currentVideo = "";
  chrome.runtime.onMessage.addListener((obj) => {
    // destructuring the values that we are getting
    const { type, videoId } = obj;

    if (type === "NEW") {
        currentVideo = videoId;
    }
  });;

  // Send a GET request to the API endpoint.
  fetch(`https://kartikjoshiapi.com/summarize?videoId=${currentVideo}`)
    .then(response => response.json()) // Parse the response as JSON.
    .then(summary => {
      // Display the summary in the popup window.
      summaryDiv.textContent = summary;
    })
    .catch(error => {
      // Display an error message if there was a problem with the request.
      summaryDiv.textContent = `Error: ${error.message}`;
    });
});


// const addNewBookmark = (bookmarks, bookmark) => {
//   const bookmarkTitleElement = document.createElement("div");
//   const controlsElement = document.createElement("div");
//   const newBookmarkElement = document.createElement("div");

//   bookmarkTitleElement.textContent = bookmark.desc;
//   bookmarkTitleElement.className = "bookmark-title";
//   controlsElement.className = "bookmark-controls";

//   setBookmarkAttributes("play", onPlay, controlsElement);
//   setBookmarkAttributes("delete", onDelete, controlsElement);

//   newBookmarkElement.id = "bookmark-" + bookmark.time; // to give unique id to each row so that we know which one to delete
//   newBookmarkElement.className = "bookmark";
//   newBookmarkElement.setAttribute("timestamp", bookmark.time);

//   newBookmarkElement.appendChild(bookmarkTitleElement);
//   newBookmarkElement.appendChild(controlsElement);
//   bookmarks.appendChild(newBookmarkElement);
// };

// const viewBookmarks = (currentBookmarks=[]) => { // passing empty array as default in case nothing is passed to it
//   const bookmarksElement = document.getElementById("bookmarks"); // from out html code
//   bookmarksElement.innerHTML = "";

//   if (currentBookmarks.length > 0) {
//     for (let i = 0; i < currentBookmarks.length; i++) {
//       const bookmark = currentBookmarks[i];
//       addNewBookmark(bookmarksElement, bookmark);
//     }
//   } else {
//     bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
//   }

//   return;
// };

// const onPlay = async e => {
//   const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//   const activeTab = await getActiveTabURL();

//   // this sends msg to the contentScript
//   chrome.tabs.sendMessage(activeTab.id, {
//     type: "PLAY",
//     value: bookmarkTime,
//   });
// };

// const onDelete = async e => {
//   const activeTab = await getActiveTabURL();
//   const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//   const bookmarkElementToDelete = document.getElementById(
//     "bookmark-" + bookmarkTime
//   );

//   bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

//   chrome.tabs.sendMessage(activeTab.id, {
//     type: "DELETE",
//     value: bookmarkTime,
//   }, viewBookmarks); // sendMessage takes a callback function optionally so we are giving viewBookmarks so that the deletion updte can be seen immediately
// };

// // this fn helps get started with the logic of play and delete
// const setBookmarkAttributes =  (src, eventListener, controlParentElement) => {
//   const controlElement = document.createElement("img");

//   controlElement.src = "assets/" + src + ".png";
//   controlElement.title = src;
//   controlElement.addEventListener("click", eventListener);
//   controlParentElement.appendChild(controlElement);
// };

// // to load all our bookmarks and show them
// document.addEventListener("DOMContentLoaded", async () => {
//   const activeTab = await getActiveTabURL(); // find the current tab
//   const queryParameters = activeTab.url.split("?")[1];
//   const urlParameters = new URLSearchParams(queryParameters);

//   const currentVideo = urlParameters.get("v");

//   if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
//     chrome.storage.sync.get([currentVideo], (data) => {
//       const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

//       viewBookmarks(currentVideoBookmarks);
//     });
//   } else {
//     const container = document.getElementsByClassName("container")[0];

//     container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
//   }
// });

