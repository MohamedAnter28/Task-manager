document.getElementById('add-task').addEventListener('click', function() {
  const taskInput = document.getElementById('task');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const taskId = 'task-' + new Date().getTime(); // Create a unique ID for each task

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  taskDiv.id = taskId;
  taskDiv.draggable = true;
  taskDiv.innerHTML = `
    <div>
      <p class="title">${taskText}</p>
      <i class="fa-solid fa-trash" onclick="removeTask(event)"></i>
    </div>
  `;

  taskDiv.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', taskId);
    event.dataTransfer.effectAllowed = 'move'; // Indicate that this is a move operation
  });

  document.getElementById('not-completed').appendChild(taskDiv);

  saveTasks(); // Save tasks to localStorage
  taskInput.value = '';
});

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('text/plain');
  const taskDiv = document.getElementById(taskId);
  
  if (taskDiv) {
    event.target.closest('.tasks').appendChild(taskDiv);
    saveTasks(); // Save tasks to localStorage
  }
}

function removeTask(event) {
  const task = event.target.closest('.task');
  task.remove();
  saveTasks(); // Save tasks to localStorage
}

function saveTasks() {
  const taskContainers = document.querySelectorAll('.tasks');
  const tasks = [];

  taskContainers.forEach(container => {
    const containerId = container.id;
    container.querySelectorAll('.task').forEach(task => {
      tasks.push({
        id: task.id,
        text: task.querySelector('.title').textContent,
        container: containerId
      });
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = task.id;
    taskDiv.draggable = true;
    taskDiv.innerHTML = `
      <div>
        <p class="title">${task.text}</p>
        <i class="fa-solid fa-trash" onclick="removeTask(event)"></i>
      </div>
    `;

    taskDiv.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text/plain', task.id);
      event.dataTransfer.effectAllowed = 'move'; // Indicate that this is a move operation
    });

    document.getElementById(task.container).appendChild(taskDiv);
  });
}

// Load tasks on page load
window.addEventListener('load', loadTasks);
