// Prompt the user for a link
const targetUrl = "https://en.wikipedia.org/wiki/Basketball" // prompt("Enter a URL:"); // 

// Prompt the user for the blacklist words (comma-separated)
const blacklistWordsInput = prompt("Enter the words to blacklist (comma-separated):"); // "basketball,football,tennis"
const blacklistWords = blacklistWordsInput.split(",").map(word => word.trim().toLowerCase());

// Fetch the URL and parse the response as text
fetch(targetUrl)
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
            return;
          }
        });

        if (!sentenceHasBlacklistWord) {
          // Append the sentence to the new paragraph
          newParagraph.textContent += sentence + '. ';
        }
      });

      // Append the new paragraph to the temporary div
      tempDiv.appendChild(newParagraph);
    });

    // Clear the existing page content
    document.open();
    document.close();

    // Replace the entire page content with the modified content
    document.write(tempDiv.innerHTML);
  })
  .catch(error => {
    console.error("Error fetching the URL:", error);
  });
