document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
 
  const filterAllBtn = document.getElementById('filter-all');
  const filterActiveBtn = document.getElementById('filter-active');
  const filterDoneBtn = document.getElementById('filter-done');
 
  // Track active filter ('all', 'active', 'done')
  let currentFilter = 'all';
 
  // Update counter display for active (non-completed) items
  function updateCounter() {
    const activeCount = todoList.querySelectorAll('li:not(.completed)').length;
    counter.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
  }
 
  // Update visibility of list items based on active filter
  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    items.forEach(li => {
      const isCompleted = li.classList.contains('completed');
      if (currentFilter === 'all') {
        li.style.display = '';
      } else if (currentFilter === 'active') {
        li.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        li.style.display = isCompleted ? '' : 'none';
      }
    });
  }
 
  // Feature 1 & 2: Add item / Handle empty input
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
 
    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
 
    errorMsg.classList.add('hidden');
 
    // Create item structure
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;
 
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
 
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
 
    input.value = '';
    input.focus();
    applyFilter();
    updateCounter();
  });
 
  // Feature 3, 4, & 7: Event Delegation on #todo-list
  todoList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('li');
 
    if (!li) return;
 
    // Feature 4: Delete item
    if (target.classList.contains('delete-btn')) {
      li.remove();
      updateCounter();
      return;
    }
 
    // Feature 3: Toggle complete when clicking item text or item container
    if (target.classList.contains('todo-text') || target === li) {
      li.classList.toggle('completed');
      applyFilter();
      updateCounter();
    }
  });
 
  // Feature 5: Filter buttons
  filterAllBtn.addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
  });
 
  filterActiveBtn.addEventListener('click', () => {
    currentFilter = 'active';
    applyFilter();
  });
 
  filterDoneBtn.addEventListener('click', () => {
    currentFilter = 'done';
    applyFilter();
  });
 
  // Initial state
  updateCounter();
});
