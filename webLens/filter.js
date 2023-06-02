// Prompt the user for a link
const targetUrl = prompt("Enter a URL:"); // "https://en.wikipedia.org/wiki/Basketball"

// Prompt the user for the blacklist words (comma-separated)
const blacklistWordsInput = prompt("Enter the words to blacklist (comma-separated):"); // "basketball,basket,NBA"
const blacklistWords = blacklistWordsInput.split(",").map(word => word.trim().toLowerCase());

function getActiveTabUrl() {
  // Check if the browser is Chrome.
  if (typeof chrome !== "undefined") {
    // Get the current tab id.
    var tabId = chrome.tabs.activeTab.id;

    // Get the tab object for the current tab id.
    var tab = chrome.tabs.get(tabId);

    // Get the URL of the tab object.
    var url = tab.url;

    // Return the URL.
    return url;
  } else if (typeof firefox !== "undefined") {
    // Get the current tab id.
    let tabId = browser.tabs.query({currentWindow: true, active: true}).then(tabs => tabs[0].id);

    // Get the tab object for the current tab id.
    let tab = browser.tabs.get(tabId);

    // Get the URL of the tab object.
    let url = tab.url;

    // Return the URL.
    return url;
  } else {
    // The browser is not Chrome or Firefox.
    return null;
  }
}

var tabUrl = getActiveTabUrl();

// Fetch the URL and parse the response as text
fetch(tabUrl)
  .then(response => response.text())
  .then(data => {
    // Create a temporary div element to parse the HTML response
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;

    // Get all the paragraphs from the article
    const paragraphs = tempDiv.querySelectorAll("p");

    // Loop through each paragraph and process/render accordingly
    paragraphs.forEach(paragraph => {
      // Create a new paragraph element
      const newParagraph = document.createElement("p");
      
      // Split the paragraph into sentences
      const sentences = paragraph.textContent.split('. ');

      // Loop through each sentence and check if it contains any blacklist words
      sentences.forEach(sentence => {
        let sentenceHasBlacklistWord = false;
        blacklistWords.forEach(word => {
          if (sentence.toLowerCase().includes(word)) {
            sentenceHasBlacklistWord = true;
            console.log(`Found blacklist word: ${word}\nSentence: ${sentence}`);
            return;
          }
        });

        if (!sentenceHasBlacklistWord) {
          // Append the sentence to the new paragraph
          newParagraph.textContent += sentence;
        }
      });

      // Append the new paragraph to the body of the document
      document.body.appendChild(newParagraph);
    });
  })
  .catch(error => {
    console.error("Error fetching the URL:", error);
  });
