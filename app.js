
// app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskUrl = document.getElementById('task-url');
    const taskList = document.getElementById('task-list');

    // Load tasks from LocalStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => addTaskToList(task));
    }

    // Save tasks to LocalStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task to the list
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task.id;

        const text = document.createElement('span');
        text.textContent = task.title;
        text.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            updateTask(task);
        });

        const editButton = document.createElement('img');
        editButton.src = 'https://via.placeholder.com/20?text=E';
        editButton.alt = 'Edit';
        editButton.addEventListener('click', () => {
            const newTitle = prompt('Edit task', task.title);
            const newUrl = prompt('Edit URL', task.url);
            if (newTitle !== null) {
                task.title = newTitle;
                task.url = newUrl;
                updateTask(task);
                loadTasks();
            }
        });

        const deleteButton = document.createElement('img');
        deleteButton.src = 'https://via.placeholder.com/20?text=X';
        deleteButton.alt = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
            taskList.removeChild(li);
        });

        li.appendChild(text);
        if (task.url) {
            const link = document.createElement('a');
            link.href = task.url;
            link.textContent = 'Media Link';
            link.className = 'media-link';
            link.target = '_blank';
            li.appendChild(link);
        }
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Add new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskInput.value;
        const url = taskUrl.value;
        const task = {
            id: Date.now().toString(),
            title,
            url,
            completed: false,
        };
        addTaskToList(task);
        saveTask(task);
        taskInput.value = '';
        taskUrl.value = '';
    });

    // Save new task
    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        saveTasks(tasks);
    }

    // Update task
    function updateTask(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        saveTasks(tasks);
    }

    // Delete task
    function deleteTask(id) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks);
    }

    // Initial load
    loadTasks();
});
