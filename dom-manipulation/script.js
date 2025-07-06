// Array of quote objects
const quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Do one thing every day that scares you.", category: "Courage" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Get the DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><em>Category:</em> ${quote.category}</p>
  `;
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  // Validate input
  if (quoteText === "" || quoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add new quote to the array
  quotes.push({ text: quoteText, category: quoteCategory });

  // Clear input fields
  textInput.value = "";
  categoryInput.value = "";

  // Optionally show the newly added quote
  showRandomQuote();
}

// Set up the event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Show an initial quote
  showRandomQuote();
});
