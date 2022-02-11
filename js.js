const addTaskBtn = document.querySelector('#add-task-btn');
const addTaskInput = document.querySelector('#description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemEl = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTamplate = (task, index) => {
    return `
    <div class="todoItem ${task.completed ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input onclick="completedTascs(${index})" class="checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
            <button onclick="deleteTascs(${index})"  class="btnDelete">Удалить</button>
        </div>
    </div>
    `
};

// const filterTasks = () => {
//     const activTaskses = tasks.length && tasks.filter(item => item.completed == false);
//     const compTaskses = tasks.length && tasks.filter(item => item.completed == true);
//     tasks = [...activTaskses, ...compTaskses];
// }

const fillHTMLList = () => {
    todosWrapper.innerHTML = '';
    if (tasks !== undefined) {
        // filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTamplate(item, index);
        });
        todoItemEl = document.querySelectorAll('.todoItem');
    }
}

fillHTMLList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completedTascs = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemEl[index].classList.add('checked');
    } else {
        todoItemEl[index].classList.remove('checked');
    }
    updateLocal();
    fillHTMLList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(addTaskInput.value));
    updateLocal();
    fillHTMLList();
    addTaskInput.value = '';
})

const deleteTascs = index => {
    todoItemEl[index].classList.add('deletEl')
    tasks.splice(index, 1);
    setInterval(() => {
        updateLocal();
        fillHTMLList();
    }, 600)
}