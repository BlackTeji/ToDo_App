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
    const hour = new Date().getHours();
    document.body.classList.remove("category-work", "category-personal", "category-shopping", "category-others");

    // Time-based background
    if (hour < 12) {
        document.body.style.background = "linear-gradient(-45deg, #fce38a, #f38181)";
    } else if (hour < 18) {
        document.body.style.background = "linear-gradient(-45deg, #00c6ff, #0072ff)";
    } else {
        document.body.style.background = "linear-gradient(-45deg, #243544, #3b4c5f)";
    }

    // Category-based background
    const category = categorySelect.value;
    if (category) {
        document.body.classList.add(`category-${category}`);
    }
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateBackground(); // Update background to match dark mode
});

// Add task event for the "Add" button
function addTask() {
    const taskText = todoInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const reminderTime = reminderTimeInput.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Remove "No tasks yet!" message when adding the first task
    if (todoList.children.length === 1 && todoList.children[0].textContent === "No tasks yet! Add one above to get started.") {
        todoList.children[0].remove();
    }

    // Create task item
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>${taskText}</strong>
        <small>Category: ${category}</small><br />
        <small>Priority: ${priority}</small><br />
        <small>Due Date: ${dueDate}</small><br />
        <small>Reminder Time: ${reminderTime}</small>
    `;

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        todoList.removeChild(listItem);
    });

    // Add a checkbox for marking as completed
    const markCompleteBtn = document.createElement("button");
    markCompleteBtn.textContent = "✔️ Mark as Completed";
    markCompleteBtn.addEventListener("click", () => {
        listItem.classList.toggle("completed");
        markCompleteBtn.textContent = listItem.classList.contains("completed") ? "❌ Unmark" : "✔️ Mark as Completed";
    });

    // Append buttons to the list item
    listItem.appendChild(markCompleteBtn);
    listItem.appendChild(deleteBtn);

    // Append the task to the list
    todoList.appendChild(listItem);

    // Clear the input fields
    todoInput.value = "";
    dueDateInput.value = "";
    reminderTimeInput.value = "";
}

// Add task when the "Enter" key is pressed
todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Initialize
window.addEventListener("load", () => {
    fetchQuote(); // Display a quote on load
    updateBackground(); // Set initial background
});
