// Get references to DOM elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Add event listener for "Add" button
addBtn.addEventListener("click", addTodo);

// Function to add a new todo item
function addTodo() {
    const task = todoInput.value.trim();
    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    // Create new list item
    const listItem = document.createElement("li");
    listItem.textContent = task;

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        todoList.removeChild(listItem);
    });

    // Append task and delete button to the list item
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);

    // Clear the input field
    todoInput.value = "";
}
