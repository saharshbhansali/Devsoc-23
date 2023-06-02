// Prompt the user for a link
const targetUrl = prompt("Enter a URL:"); // "https://en.wikipedia.org/wiki/Basketball" // 

// Prompt the user for the blacklist word
const blacklistWord = prompt("Enter the word to blacklist:"); // "basketball" // 

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

      // Loop through each sentence and check if it contains the blacklist word
      sentences.forEach(sentence => {
        if (!sentence.toLowerCase().includes(blacklistWord.toLowerCase())) {
          // Append the sentence to the new paragraph
          newParagraph.textContent += sentence + '. ';
        }
      });

      // Append the new paragraph to the body of the document
      document.body.appendChild(newParagraph);
    });
  })
  .catch(error => {
    console.error("Error fetching the URL:", error);
  });
