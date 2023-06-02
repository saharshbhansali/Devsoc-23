document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filterButton").addEventListener("click", filterParagraphs);
  });
  
  function filterParagraphs() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(tabs[0].id, { file: "filter.js" });
    });
  }
  