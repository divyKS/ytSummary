// to add that button to the youtube video we have to manipulate the dom of the webpage we are currently on, 
// i.e. w.r.t to the context of the current page

// self invoking anonymous function, an IIFE immediately invoed function expression
// ()=>{} is an arrow function (()=>{}) makes the function and expression and () at the end is there to call it immediately
(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = []; // this would store all video bookmarks

    // this below is to check for the message coming from background.js
    // response is if we want to send back something from where the obj came

    //this checks if we have got a new video and then puts the id int the currentVideo variable and calls newVideoLoaded function
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        // destructuring the values that we are getting
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        // bookmark-btn is what the eleemts class would also have if it already has that sign so checking for that
        // [0] since it was some html collection so getting the first occurence
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        // console.log(bookmarkBtnExists); true/falsee/undefined

        if (!bookmarkBtnExists) {
            // create img tag in the yt html is our button didn't exist already
            const bookmarkBtn = document.createElement("img");

            // we need an absolute url on our machine of the img that is present in our local directory since we have to upload it
            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            // these getElementsByClassName is for the thing on youtube website, ytp-leftcontol etc are what youtube is using
            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

            newVideoLoaded();

        }
    }

    //  which is that in our manifest json file, we have a match pattern for our content script.
    // And basically the match pattern, we currently have checks if any youtube.com video is loaded.
    // And if it is, we're injecting our content script into the context of that web page.
    // So basically, what that means is, anytime a youtube.com page shows up, we're running a bunch of logic using our content script.
    // But the problem right now is that our background.js file is telling us when a new video is loaded.
    // And the event listener we're using is on updated, which is just checking if this URL is updated.
    // If you refresh this page, the URL is not updated.
    // So this button actually isn't going to show up.
    // And if you continue coding without this fix right here, you're gonna see some edge cases that you might not like.
    // We're just going to call a new video loaded anytime our content script matches youtube.com.
    // And what this is going to do is call this new video loaded function anytime we hit that match pattern.

    const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime; // is in seconds  
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + currentTime,
        };
        console.log(newBookmark);

        chrome.storage.sync.set({ 
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark]) // sort on basis of saved time stamp
        });
    }

})();

