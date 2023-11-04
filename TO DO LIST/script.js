document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        savedTasks.forEach((taskText, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${taskText}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;

            taskList.appendChild(listItem);

            // Add a click event listener for the delete button.
            listItem.querySelector('.delete').addEventListener('click', function () {
                savedTasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });

            // Add a click event listener for the edit button.
            listItem.querySelector('.edit').addEventListener('click', function () {
                const newTaskText = prompt('Edit the task:', taskText);
                if (newTaskText !== null) {
                    savedTasks[index] = newTaskText;
                    updateLocalStorage();
                    renderTasks();
                }
            });
        });
    }

    // Initial rendering of tasks
    renderTasks();

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        savedTasks.push(taskText);
        updateLocalStorage();
        renderTasks();

        taskInput.value = '';
    });
});
