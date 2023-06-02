// Prompt the user for a link
const targetUrl = prompt("Enter a URL:");
// Prompt the user for the blacklist word
const blacklistWord = prompt("Enter the word to blacklist:");

// Fetch the target URL
fetch(targetUrl)
  .then(response => response.text())
  .then(data => {
    // Create a temporary div element to parse the HTML response
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;

    // Get all the paragraphs from the target URL
    const paragraphs = tempDiv.querySelectorAll("p");

    // Loop through each paragraph and process/render accordingly
    paragraphs.forEach(paragraph => {
      // Check if the paragraph contains the blacklist word
      if (paragraph.textContent.toLowerCase().includes(blacklistWord.toLowerCase())) {
        // Create a new div element to wrap the paragraph
        const wrapperDiv = document.createElement("div");

        // Create a new span element to replace the paragraph
        const hiddenContent = document.createElement("span");
        hiddenContent.style.display = "none";
        hiddenContent.innerHTML = paragraph.innerHTML;

        // Create a button to reveal the hidden content
        const revealButton = document.createElement("button");
        revealButton.textContent = "Reveal";
        revealButton.addEventListener("click", () => {
          hiddenContent.style.display = "block";
          revealButton.style.display = "none";
        });

        // Append the hidden content and reveal button to the wrapper div
        wrapperDiv.appendChild(hiddenContent);
        wrapperDiv.appendChild(revealButton);

        // Replace the paragraph with the wrapper div
        paragraph.parentNode.replaceChild(wrapperDiv, paragraph);
      }
    });
  })
  .catch(error => {
    console.error("Error fetching the URL:", error);
  });
