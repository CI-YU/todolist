//selectors
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter_todo');
//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//functions

function addTodo(event) {
  event.preventDefault();
  fetch('./tasks', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ description: todoInput.value, completed: false }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //todo DIV
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      todoDiv.setAttribute('id', res._id);
      todoDiv.setAttribute('data_completed', res.completed);
      //todo LI
      const newTodo = document.createElement('li');
      newTodo.innerText = todoInput.value;
      newTodo.classList.add('todo_item');
      todoDiv.appendChild(newTodo);
      if (todoInput.value === '') {
        return null;
      }
      //check mark BUTTON
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete_btn');
      todoDiv.appendChild(completedButton);
      //delete BUTTON
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.classList.add('delete_btn');
      todoDiv.appendChild(deleteButton);
      //Append to Actual LIST
      todoList.appendChild(todoDiv);
      //Clear todo input VALUE
      todoInput.value = '';
    });
}
//DELETE & CHECK
function deleteCheck(e) {
  const completed =
    e.target.parentElement.getAttribute('data_completed') !== 'true';
  const id = e.target.parentElement.id;
  const item = e.target;
  //DELETE ITEM
  if (item.classList[0] === 'delete_btn') {
    const todo = item.parentElement;
    fetch(`./tasks/${id}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        if (res === 'OK') {
          //ANIMATION TRANSITION
          todo.classList.add('fall');
          todo.addEventListener('transitionend', function () {
            todo.remove();
          });
        }
      });
  }
  //COMPLETE ITEM
  if (item.classList[0] === 'complete_btn') {
    fetch(`./tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        if (res === 'OK') {
          const todo = item.parentElement;
          todo.classList.toggle('completedItem');
        }
      });
  }
}
//FILTERING THE TASKS ACCORDING THE OPTION
function filterTodo(e) {
  const todos = todoList.childNodes;
  for (let i = 1; i < todos.length; i++) {
    switch (e.target.value) {
      case 'all':
        todos[i].style.display = 'flex';
        break;
      case 'completed':
        if (todos[i].classList.contains('completedItem')) {
          todos[i].style.display = 'flex';
        } else {
          todos[i].style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todos[i].classList.contains('completedItem')) {
          todos[i].style.display = 'flex';
        } else {
          todos[i].style.display = 'none';
        }
        break;
    }
  }
}
fetch('./tasks', {
  method: 'get',
  headers: {
    'content-type': 'application/json',
  },
})
  .then((res) => {
    return res.json();
  })
  .then((result) => {
    result.forEach((element) => {
      //todo DIV
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo', element.completed ? 'completedItem' : null);
      todoDiv.setAttribute('id', element._id);
      todoDiv.setAttribute('data_completed', element.completed);
      //todo LI
      const newTodo = document.createElement('li');
      newTodo.innerText = element.description;
      newTodo.classList.add('todo_item');
      todoDiv.appendChild(newTodo);
      //check mark BUTTON
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete_btn');
      todoDiv.appendChild(completedButton);
      //delete BUTTON
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.classList.add('delete_btn');
      todoDiv.appendChild(deleteButton);
      //Append to Actual LIST
      todoList.appendChild(todoDiv);
    });
  });
