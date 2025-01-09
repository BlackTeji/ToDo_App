// Get references to DOM elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const darkModeToggle = document.getElementById("darkModeToggle");

// Add event listener for dark mode toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Add event listener for "Add" button
addBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create new list item
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      ${taskText}
      <button class="deleteButton">Delete</button>
    `;

    // Animate task addition
    taskItem.style.opacity = 0; // Start invisible
    todoList.appendChild(taskItem);
    setTimeout(() => (taskItem.style.opacity = 1), 50); // Fade in

    // Clear input field
    todoInput.value = "";

    // Add delete functionality
    const deleteButton = taskItem.querySelector(".deleteButton");
    deleteButton.addEventListener("click", () => {
        // Animate task removal
        taskItem.style.transform = "translateX(-100%)";
        taskItem.style.opacity = 0;
        setTimeout(() => taskItem.remove(), 300); // Wait for animation
    });
});

// Optional: Add enter key functionality for input field
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});
