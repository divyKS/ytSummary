import { getActiveTabURL } from "./utils.js";

// const summarizeButton = document.getElementById('summarizeButton');
// const summaryDiv = document.getElementById('summary');

document.addEventListener("DOMContentLoaded", () => {

  const summarizeButton = document.getElementById("summarizeButton");

  summarizeButton.addEventListener("click", () => {

    chrome.runtime.sendMessage((response) => {
      const summaryDiv = document.getElementById("summary");
      if (response.summary) {
        summaryDiv.textContent = response.summary;
      } else {
        summaryDiv.textContent = "An error occurred while summarizing the video.";
      }
    });
  });
});

  