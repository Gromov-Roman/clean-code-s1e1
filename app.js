const newTaskInput = document.querySelector('.new-item__task__input');
const addButton = document.querySelector('.new-item__task__add');
const incompleteTasks = document.querySelector('.tasks__list_incomplete');
const completedTasks = document.querySelector('.tasks__list_completed');

const createNewTaskElement = function (taskName) {
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const deleteButtonImg = document.createElement('img');

    listItem.className = 'task';

    label.innerText = taskName;
    label.className = 'task__name';

    checkBox.type = 'checkbox';
    checkBox.className = 'task__select';

    editInput.type = 'text';
    editInput.className = 'task__input';

    editButton.innerText = 'Edit';
    editButton.className = 'task__edit';

    deleteButton.className = 'task__delete';
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = 'Remove Button';
    deleteButtonImg.className = 'task__delete__img';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};


const addTask = function () {
    if (!newTaskInput.value) {
        return;
    }

    const listItem = createNewTaskElement(newTaskInput.value);

    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    newTaskInput.value = '';
};

const editTask = function () {
    const listItem = this.parentNode;

    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector('label');
    const editBtn = listItem.querySelector('.task__edit');
    const containsClass = listItem.classList.contains('task_edit-mode');

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    listItem.classList.toggle('task_edit-mode');
};

const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
};


const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};


const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};


const ajaxRequest = function () {
    console.log('AJAX Request');
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector('input[type=checkbox]');
    const editButton = taskListItem.querySelector('button.task__edit');
    const deleteButton = taskListItem.querySelector('button.task__delete');

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTasks.children.length; i++) {
    bindTaskEvents(incompleteTasks.children[i], taskCompleted);
}

for (let i = 0; i < completedTasks.children.length; i++) {
    bindTaskEvents(completedTasks.children[i], taskIncomplete);
}


// TODO: Issues with usability don't get seen until they are in front of a human tester.

// TODO: Prevent creation of empty tasks.

// TODO: Change edit to save when you are in edit mode.
