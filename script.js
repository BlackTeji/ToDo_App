// Get references to DOM elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const darkModeToggle = document.getElementById('darkModeToggle');
const clearBtn = document.getElementById('clear-btn');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add event listener for dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Add event listener for "Add Task" button
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        text: taskText,
        completed: false,
        priority: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    todoInput.value = ''; // Clear input field
});

// Function to render the tasks in the list
function renderTasks() {
    todoList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);

        taskItem.innerHTML = `
            <span class="${task.priority ? 'priority' : ''}">${task.text}</span>
            <button class="deleteButton">Delete</button>
            <button class="editButton">Edit</button>
            <button class="toggleCompletedButton">${task.completed ? 'Undo' : 'Complete'}</button>
        `;

        // Add event listeners for buttons
        taskItem.querySelector('.deleteButton').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskItem.querySelector('.editButton').addEventListener('click', () => {
            const newText = prompt("Edit your task:", task.text);
            if (newText) {
                tasks[index].text = newText;
                saveTasks();
                renderTasks();
            }
        });

        taskItem.querySelector('.toggleCompletedButton').addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        todoList.appendChild(taskItem);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
clearBtn.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    renderTasks();
});

// Initial render
renderTasks();

