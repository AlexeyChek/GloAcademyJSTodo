'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

function setLocalStorage(arr){
  localStorage.todo = JSON.stringify(todoData);
};

function getLocalStorage(){
  if(localStorage.todo) {
    const temp = JSON.parse(localStorage.todo);
    temp.forEach(function(item){
      todoData.push(item);
    });
  };
};

const render = function(){
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' +
    '<button class="todo-remove"></button>' +
		'<button class="todo-complete"></button>' +
    '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete');

    btnTodoCompleted.addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });

    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoRemove.addEventListener('click', function(){
      todoData.splice(todoData.indexOf(item),1);
      render();
    });
  });
  setLocalStorage(todoData);
};

todoControl.addEventListener('submit', function(event){
  event.preventDefault();

  if(headerInput.value === '') return;

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };

  todoData.push(newTodo);

  headerInput.value = '';

  render();
});
getLocalStorage();
render();

