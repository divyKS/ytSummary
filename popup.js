document.addEventListener("DOMContentLoaded", () => {
  const summarizeButton = document.getElementById("summarizeButton");
  summarizeButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "summarize" }, (response) => {
      const summaryDiv = document.getElementById("summary");
      if (response.summary) {
        summaryDiv.textContent = response.summary;
      } else {
        summaryDiv.textContent = "An error occurred while summarizing the video.";
      }
    });
  });
});
