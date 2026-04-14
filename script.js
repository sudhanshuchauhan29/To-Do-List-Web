/**
 * Welcome to the heart of our To-Do List App!
 * 
 * I've built this to be as dynamic as possible, handling most of the UI rendering
 * and logic right here in JavaScript. The HTML is just a simple container,
 * and we're bringing it to life here.
 */

// --- State Management ---
// Array to track tasks
// We'll also try to load any existing tasks from the user's browser storage.
let tasks = JSON.parse(localStorage.getItem('my_todos')) || [];

// --- UI Elements ---
const appContainer = document.getElementById('app');


function renderApp() {
    appContainer.innerHTML = '';

    // Create the main container div
    const container = document.createElement('div');
    container.className = 'container';

    // Header Section - Let's make it feel human
    const header = document.createElement('div');
    header.className = 'header';
    const title = document.createElement('h1');
    title.textContent = "What's on your mind?";
    const subtitle = document.createElement('p');
    subtitle.textContent = "Every big goal starts with a small step. Let's list them!";
    
    header.appendChild(title);
    header.appendChild(subtitle);
    container.appendChild(header);

    // Input Section - Where the magic begins
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add a new task...';
    input.id = 'todo-input';
    
    // Add task on Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.textContent = 'Add';
    addBtn.onclick = addTask;

    inputGroup.appendChild(input);
    inputGroup.appendChild(addBtn);
    container.appendChild(inputGroup);

    // List Section - Displaying our hard work
    const list = document.createElement('ul');
    list.className = 'todo-list';

    if (tasks.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = "Looks like you're all caught up! Enjoy your day.";
        list.appendChild(emptyState);
    } else {
        tasks.forEach((task, index) => {
            const item = document.createElement('li');
            item.className = 'todo-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = task.completed;
            checkbox.onchange = () => toggleTask(index);

            const text = document.createElement('span');
            text.className = `todo-text ${task.completed ? 'completed' : ''}`;
            text.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(index);

            item.appendChild(checkbox);
            item.appendChild(text);
            item.appendChild(deleteBtn);
            list.appendChild(item);
        });
    }

    container.appendChild(list);
    appContainer.appendChild(container);

    // Focus the input field after rendering for convenience
    const todoInput = document.getElementById('todo-input');
    if (todoInput) todoInput.focus();
}

// --- Logic Functions ---

/**
 * Adds a new task to our list.
 */
function addTask() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();

    if (text) {
        tasks.unshift({
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        });
        saveAndRender();
        input.value = '';
    }
}

/**
 * Toggles the completion status of a task.
 */
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

/**
 * Removes a task from the list.
 */
function deleteTask(index) {
    if (confirm("Are you sure you want to remove this task?")) {
        tasks.splice(index, 1);
        saveAndRender();
    }
}

/**
 * Saves the current state to localStorage and triggers a re-render.
 */
function saveAndRender() {
    localStorage.setItem('my_todos', JSON.stringify(tasks));
    renderApp();
}

// Initial render to kick things off!
renderApp();
