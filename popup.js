import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const stopButton = document.getElementById("stopButton");
  const summarizeButton = document.getElementById("summarizeButton");
  const switchButton = document.getElementById("switch");
  const toggleTip = document.getElementById("toggle-tip");
  let nlp = false;

  switchButton.addEventListener('mouseenter', async ()=>{
    toggleTip.style.visibility = "visible";
  });

  switchButton.addEventListener('mouseleave', async ()=>{
    toggleTip.style.visibility = "hidden";
  });

  switchButton.addEventListener("click", async ()=>{
    nlp = !nlp;
    summarizeButton.innerText = nlp ? "Summarize (NLP)" : "Summarize (GPT)";
    toggleTip.innerText = !nlp ? "NLP" : "GPT";
  });
  
  let controller = new AbortController();
  let signal = controller.signal;

  summarizeButton.addEventListener("click", async() => {
    const summary = document.getElementById("summary");

    const activeTab = await getActiveTabURL(); 
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const currentVideoID = urlParameters.get("v");

    summary.innerHTML = `
    <div class="loader-wrapper">
      <div class="loader">
        <div id="loader-1" class="loader-child loader-1"></div>
        <div id="loader-2" class="loader-child loader-2"></div>
        <div id="loader-3" class="loader-child loader-3"></div>
        <div id="loader-4" class="loader-child loader-4"></div>
        <div id="loader-5" class="loader-child loader-5"></div>
      </div>
    </div>
    `;

    
    document.getElementById('loader-1').style.animationPlayState = "running";
    document.getElementById('loader-2').style.animationPlayState = "running";
    document.getElementById('loader-3').style.animationPlayState = "running";
    document.getElementById('loader-4').style.animationPlayState = "running";
    document.getElementById('loader-5').style.animationPlayState = "running";


    if (activeTab.url.includes("youtube.com/watch") && currentVideoID){  

      fetch(nlp ? `http://localhost:5000/getsummary` : `http://localhost:5000/getsummarygpt`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'vid_id': currentVideoID
        }), signal
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

  stopButton.addEventListener('click', () => {
    controller.abort()
    document.getElementById('loader-1').style.animationPlayState = "paused";
    document.getElementById('loader-2').style.animationPlayState = "paused";
    document.getElementById('loader-3').style.animationPlayState = "paused";
    document.getElementById('loader-4').style.animationPlayState = "paused";
    document.getElementById('loader-5').style.animationPlayState = "paused";
    const summary = document.getElementById("summary");
    summary.innerHTML = "<div class='default'>Summary here</div>";
  });
  
});
