// Array of quote objects
let quotes = [];
let lastSyncedQuotes = [];

// Load quotes from localStorage on page load
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default starter quotes if none are in localStorage
    quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Do one thing every day that scares you.", category: "Courage" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
  {text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
    ];
    saveQuotes();
  }
}

// Save current quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selected = localStorage.getItem("selectedCategory") || "all";

  // Clear all options except 'all'
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter
  categoryFilter.value = selected;
}

// Get the DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function to show a random quote
function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  const filteredQuotes = category === "all" ? quotes : quotes.filter(q => q.category === category);
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = `<p>No quotes in this category.</p>`;
    return;
  }

  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><em>Category:</em> ${quote.category}</p>
  `;
  // Save the last viewed quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
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
  saveQuotes();

  // Clear input fields
  textInput.value = "";
  categoryInput.value = "";

  // Optionally show the newly added quote
  showRandomQuote();
  populateCategories();
}

// Event listener to show a new quote when button is clicked
newQuoteBtn.addEventListener("click", showRandomQuote);

// Create the quote form when the page loads
createAddQuoteForm();

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  showRandomQuote();
}

// ===== Simulated Server API Calls =====

// Simulate GET from server (randomly select 2 quotes)
function fetchQuotesFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const serverQuotes = [
        { text: "Only those who dare to fail greatly can ever achieve greatly.", category: "Inspiration" },
        { text: "Don't watch the clock; do what it does. Keep going.", category: "Productivity" }
      ];
      resolve(serverQuotes);
    }, 1000);
  });
}

// Simulate POST to server
function postQuotesToServer(newQuotes) {
  return new Promise((resolve) => {
    console.log("Posting quotes to server (simulated):", newQuotes);
    setTimeout(() => resolve(true), 500);
  });
}

// ===== Conflict Resolution & Syncing =====

function syncWithServer() {
  fetchQuotesFromServer().then(serverQuotes => {
    const serverTexts = new Set(serverQuotes.map(q => q.text));
    const localTexts = new Set(quotes.map(q => q.text));

    let conflictDetected = false;

    serverQuotes.forEach(serverQuote => {
      if (!localTexts.has(serverQuote.text)) {
        quotes.push(serverQuote);
        conflictDetected = true;
      }
    });

    if (conflictDetected) {
      saveQuotes();
      populateCategories();
      showNotification("Quotes synced from server. New quotes added.");
    }

    // Simulate pushing new local quotes to server (if any)
    const newLocalQuotes = quotes.filter(q => !serverTexts.has(q.text));
    if (newLocalQuotes.length > 0) {
      postQuotesToServer(newLocalQuotes);
    }

    lastSyncedQuotes = serverQuotes;
  });
}

function showNotification(message) {
  const notification = document.getElementById("syncNotification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 5000);
}

// ======= EXPORT QUOTES TO JSON =======
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // formatted JSON
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url); // free up memory
}

// ======= IMPORT QUOTES FROM JSON FILE =======
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
        showRandomQuote();
      } else {
        alert("Invalid format: JSON must be an array of quotes.");
      }
    } catch (error) {
      alert("Error reading JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// ======= INITIALIZE ON PAGE LOAD =======
document.addEventListener("DOMContentLoaded", function () {
  loadQuotes();
    populateCategories();

  // Show last quote from session if available
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  } else {
    showRandomQuote();
  }

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Start syncing with server every 10 seconds
  syncWithServer(); // initial call
  setInterval(syncWithServer, 10000);
});