// DOM references
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const darkModeToggle = document.getElementById("darkModeToggle");
const categorySelect = document.getElementById("category");
const prioritySelect = document.getElementById("priority");
const dueDateInput = document.getElementById("due-date");
const reminderTimeInput = document.getElementById("reminder-time");
const motivationalQuote = document.getElementById("motivationalQuote");

// Quotes Array (Fallback for API)
const quotes = [
    "You're doing great! Keep it up.",
    "Every small step counts.",
    "Believe in yourself and all that you are.",
    "Success is the sum of small efforts, repeated daily.",
    "Keep going, you're closer than you think."
];

// Function to fetch quotes from API
async function fetchQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        motivationalQuote.textContent = `"${data.content}" - ${data.author}`;
    } catch (error) {
        // Fallback to static quotes
        motivationalQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }
}

// Dynamic Backgrounds
function updateBackground() {
    const category = categorySelect.value;
    document.body.classList.remove("category-work", "category-personal", "category-shopping", "category-others");
    document.body.classList.add(`category-${category}`);
}

// Add Todo Item
addBtn.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    const priority = prioritySelect.value;
    const category = categorySelect.value;
    const dueDate = dueDateInput.value;
    const reminderTime = reminderTimeInput.value;

    if (todoText) {
        const li = document.createElement("li");
        li.classList.add(priority);

        // Set text
        li.innerHTML = `${todoText} <button onclick="markAsCompleted(this)">Mark as Completed</button><button onclick="deleteTodoItem(this)">Delete</button>`;

        // Append to list
        todoList.appendChild(li);

        // Reset input
        todoInput.value = '';
        updateBackground();
    }
});

// Mark Todo as Completed
function markAsCompleted(button) {
    const li = button.parentElement;
    li.classList.toggle("completed");
}

// Delete Todo Item
function deleteTodoItem(button) {
    const li = button.parentElement;
    todoList.removeChild(li);
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Initial Quote
fetchQuote();
