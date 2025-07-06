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

// Function to create and display a form for adding new quotes
function createAddQuoteForm() {
  // Create form elements
  const form = document.createElement("form");
  form.id = "quoteForm";

  const textLabel = document.createElement("label");
  textLabel.textContent = "Quote Text:";
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.required = true;

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category:";
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Quote";

  form.appendChild(textLabel);
  form.appendChild(textInput);
  form.appendChild(document.createElement("br"));

  form.appendChild(categoryLabel);
  form.appendChild(categoryInput);
  form.appendChild(document.createElement("br"));

  form.appendChild(submitBtn);
  document.body.appendChild(form);

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newQuote = {
      text: textInput.value.trim(),
      category: categoryInput.value.trim(),
    };

    if (newQuote.text && newQuote.category) {
      quotes.push(newQuote);
      alert("Quote added successfully!");
      form.reset();
    } else {
      alert("Please fill in both fields.");
    }
  });
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

// Event listener to show a new quote when button is clicked
newQuoteBtn.addEventListener("click", showRandomQuote);

// Create the quote form when the page loads
createAddQuoteForm();