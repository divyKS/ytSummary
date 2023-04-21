import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const summarizeButton = document.getElementById("summarizeButton");
  summarizeButton.addEventListener("click", async() => {
    const summary = document.getElementById("summary");

    const activeTab = await getActiveTabURL(); 
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const currentVideoID = urlParameters.get("v");

    summary.innerHTML = `
    <div class="loader-wrapper">
      <div class="loader"></div>
    </div>
    `;

    if (activeTab.url.includes("youtube.com/watch") && currentVideoID){
      fetch(`http://localhost:5000/getsummary`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'vid_id': currentVideoID
        })
      }).then(res => {
        return res.text();
      })
      .then(data => {
        summary.innerHTML = data;
      })
    } else {
      summary.innerHTML = `<div style="color: red;" class="default">Not a video</div>`;
    }
  });
  
});
