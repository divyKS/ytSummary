import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const summarizeButton = document.getElementById("summarizeButton");
  const switchButton = document.getElementById("switch");
  const toggleTip = document.getElementById("toggle-tip");
  let nlp = false;

  switchButton.addEventListener('mouseenter', async ()=>{
    toggleTip.style.visibility = "visible";
  })

  switchButton.addEventListener('mouseleave', async ()=>{
    toggleTip.style.visibility = "hidden";
  })

  switchButton.addEventListener("click", async ()=>{
    nlp = !nlp;
    summarizeButton.innerText = nlp ? "Summarize (NLP)" : "Summarize (GPT)";
    toggleTip.innerText = !nlp ? "NLP" : "GPT";
  });

  summarizeButton.addEventListener("click", async() => {
    const summary = document.getElementById("summary");

    const activeTab = await getActiveTabURL(); 
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const currentVideoID = urlParameters.get("v");

    summary.innerHTML = `
    <div class="loader-wrapper">
      <div class="loader">
        <div class="loader-child loader-1"></div>
        <div class="loader-child loader-2"></div>
        <div class="loader-child loader-3"></div>
        <div class="loader-child loader-4"></div>
        <div class="loader-child loader-5"></div>
      </div>
    </div>
    `;

    if (activeTab.url.includes("youtube.com/watch") && currentVideoID){
      fetch(nlp ? `http://localhost:5000/getsummary` : `http://localhost:5000/getsummarygpt`, {
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
