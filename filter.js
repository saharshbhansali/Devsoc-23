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
      // Check if the paragraph contains the word "basketball"
      if (!paragraph.textContent.toLowerCase().includes(blacklistWord.toLowerCase())) {
        // Create a new paragraph element
        const newParagraph = document.createElement("p");
        newParagraph.textContent = paragraph.textContent;

        // Append the new paragraph to the body of the document
        document.body.appendChild(newParagraph);
      }
    });
  })
  .catch(error => {
    console.error("Error fetching the Wikipedia article:", error);
  });
