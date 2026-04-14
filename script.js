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


