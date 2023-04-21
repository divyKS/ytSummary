import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const summarizeButton = document.getElementById("summarizeButton");
  summarizeButton.addEventListener("click", async() => {
    const summary = document.getElementById("summary");

    const activeTab = await getActiveTabURL(); 
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const currentVideoID = urlParameters.get("v");

    if (activeTab.url.includes("youtube.com/watch") && currentVideoID){
      summary.textContent = "this is the smmary os the video id = " + currentVideoID;
    } else {
      summary.textContent = "this is not yt video page dear";
    }
  });
  
});
