const task_form = document.getElementById("task-form");
const input = document.getElementById("task");
const addTaskBtn = document.getElementById('addTaskBtn');
const collection = document.querySelector('.collection');
const clear_tasks = document.getElementById('clear_tasks');
const search = document.getElementById('search');
let tasksArray = [];

task_form.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = input.value;
    if (!taskName) {
        alert('Please enter task name');
        return;
    }

    addTaskToLocalStorage(taskName);
    addTaskToUI(taskName);

    input.value = '';
});

addTaskBtn.addEventListener('click', addTask);
collection.addEventListener('click', deleteTask);
clear_tasks.addEventListener('click', clearAllTask);
search.addEventListener('keyup', searchTasks);

document.addEventListener('DOMContentLoaded', function () {
    getTasksFromLocalStorage();

    tasksArray.forEach(function (task) {
        addTaskToUI(task);
    });
});


function addTask(e) {
    e.preventDefault();
    const taskName = input.value;
    if (!taskName) {
        alert('Please enter task name');
        return;
    }

    addTaskToLocalStorage(taskName);
    addTaskToUI(taskName);

    input.value = '';
}

function addTaskToLocalStorage(taskName) {
    tasksArray.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function getTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== null) {
        tasksArray = JSON.parse(storedTasks);
    } else {
        tasksArray = [];
    }
}

function addTaskToUI(taskName) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = taskName;
    const deleteLink = document.createElement('a');
    deleteLink.href = '#';
    deleteLink.className = 'delete-item secondary-content';
    deleteLink.innerHTML = '<i class="fa fa-trash"></i>';
    li.appendChild(deleteLink);
    collection.appendChild(li);
}

function deleteTask(e) {
    if (e.target.classList.contains('fa-trash')) {
        if (confirm("Are you sure you want to delete this task?")) {
            const taskItem = e.target.parentElement.parentElement;
            console.log(taskItem);
            const taskText = taskItem.textContent;
            console.log(taskText);
            removeTaskFromLocalStorage(taskText);
            taskItem.remove();
        }
    } else if (e.target.classList.contains('delete-item')) {
        if (confirm("Are you sure you want to delete this task?")) {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.textContent;
            removeTaskFromLocalStorage(taskText);
            taskItem.remove();
        }
    }
}

function removeTaskFromLocalStorage(taskText) {
    const updatedTasksArray = [];

    tasksArray.forEach(function (task) {
        if (task !== taskText) {
            updatedTasksArray.push(task); // we keep the task we want here
        }
    });

    tasksArray = updatedTasksArray;
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}


function clearAllTask() {
    if (confirm("Are you sure you want to delete all the tasks")) {
        while (collection.firstChild) {
            const taskItem = collection.firstChild;
            const taskText = taskItem.textContent;
            removeTaskFromLocalStorage(taskText);
            collection.removeChild(taskItem);
        }
        tasksArray = [];
        localStorage.removeItem('tasks');
    }
}

function searchTasks() {
    const searchText = search.value.toLowerCase();
    const tasks = document.querySelectorAll('.collection-item');

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    }
}
