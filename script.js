function createTodo() {
  const inputValue = document.getElementById('myInput').value;

  if (inputValue === '') {
    alert('You must write something!');
    return;
  }

  fetch('https://maitanlaw-production.up.railway.app/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: inputValue,
      description: inputValue,
      status: 'active',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      fetchTodos();
    })
    .catch((error) => console.error('Error adding todo:', error));

  document.getElementById('myInput').value = '';
}

function fetchTodos() {
  fetch('https://maitanlaw-production.up.railway.app/todos')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';

      data.forEach((todo) => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        const textNode = document.createTextNode(todo.title);
        li.appendChild(textNode);

        if (todo.status === 'inactive') {
          li.classList.add('checked');
        }

        li.addEventListener('click', () =>
          updateTodoStatus(todo._id, todo.status)
        );

        todoList.appendChild(li);
      });
    })
    .catch((error) => console.error('Error fetching todos:', error));
}

function updateTodoStatus(id, currentStatus) {
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

  fetch(`https://maitanlaw-production.up.railway.app/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      fetchTodos();
    })
    .catch((error) => console.error('Error updating todo:', error));
}

window.onload = function () {
  fetchTodos();
};
