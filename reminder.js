const input = document.querySelector('#input-task');
const input_des = document.querySelector('#input-description');

const TaskContainer = document.querySelector('#taskContainer');
const form = document.querySelector('#Taskform');

const total_task = document.querySelector('#total-task');
const pending_task = document.querySelector('#pending-task');
const completed_task = document.querySelector('#completed-task');

const low_task = document.querySelector('#low-task');
const high_task = document.querySelector('#high-task');


let SelectedPriority = "low";


low_task.addEventListener("click", function () {

    SelectedPriority = "low";

    input.style.background = "#22f80631";
    input.style.color = "White";
    input.style.border = "1px solid #1eff00";

    input_des.style.background = "#22f80631";
    input_des.style.color = "White";
    input_des.style.border = "1px solid #1eff00";

});

high_task.addEventListener("click", function () {

    SelectedPriority = "high";

    input.style.background = "#ff000063";
    input.style.color = "white";
    input.style.border = "1px solid #ff0000";

    input_des.style.background = "#ff000063";
    input_des.style.color = "white";
    input_des.style.border = "1px solid #ff0000";

});


form.addEventListener("submit", function (event) {
    event.preventDefault();


    const text_input = input.value;
    const description_input = input_des.value;

    if (text_input.trim() === "" && description_input.trim() === "") {
        return;
    }

    const task_card = document.createElement('div');
    task_card.classList.add('task-card', SelectedPriority, 'pending');

    const task_name = document.createElement('span');
    task_name.classList.add('task-name');
    task_name.textContent = text_input;

    const description = document.createElement('p');
    description.classList.add('task-description');
    description.textContent = description_input;

    const status = document.createElement('span');
    status.classList.add('task-status');
    status.textContent = "Pending";

    const action = document.createElement('div');
    action.classList.add('action');


    const completeButton = document.createElement('button');
    completeButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completeButton.classList.add('complete-button');
    completeButton.type = "button";

    completeButton.addEventListener("click", function () {

        task_card.classList.toggle('completed');
        task_card.textContent = "Completed";


        const clear = document.createElement('button');
        clear.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        clear.classList.add('clear-task');
        clear.type = "button";

        clear.addEventListener("click", function () {

            task_card.style.transition = "0.3s ease-in-out";
            task_card.style.opacity = "0";

            setTimeout(function () {

                task_card.remove();
                updatedEmptyMess();
                update();
            }, 300);

        });

        task_card.appendChild(clear);
        update();
    });


    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    deleteButton.classList.add('delete-button');
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
        task_card.style.transition = "0.3s ease-in-out";
        task_card.style.opacity = "0";

        setTimeout(function () {

            task_card.remove();
            updatedEmptyMess();
            update();
        }, 300);

    });

    action.appendChild(completeButton);
    action.appendChild(deleteButton);

    task_card.appendChild(task_name);
    task_card.appendChild(description);
    task_card.appendChild(status);
    task_card.appendChild(action);


    const emtymess = document.querySelector('.message-empty');

    if (emtymess) {
        emtymess.remove();
    }

    if (SelectedPriority === "high") {
        TaskContainer.prepend(task_card);

    } else {
        TaskContainer.appendChild(task_card);

    }
    input.value = "";
    input_des.value = "";
    update();

});


function update() {

    const task_complete = document.querySelectorAll('.task-card.completed');
    const task_pending = document.querySelectorAll('.task-card.pending');
    const task = document.querySelectorAll('.task-card');

    total_task.textContent = task.length;
    pending_task.textContent = task_pending.length - task_complete.length;
    completed_task.textContent = task_complete.length;

    const t = document.querySelector('#t');
    const p = document.querySelector('#p');
    const c = document.querySelector('#c');

    if (task.length > 0) {
        t.style.background = "linear-gradient(45deg, rgba(4, 0, 255, 0.33), rgba(0, 153, 255, 0.34))";
        t.style.color = "#00ffd5";
        t.style.border = "1px solid #00f7ff";
    } else {
        t.style.background = "";
        t.style.color = "";
        t.style.border = "";
    }

if (task_pending.length > 0) {
    p.style.background = "#ff48002a";
    p.style.color = "#ff9900";
    p.style.border = "1px solid #ff5e00";
} else {
    p.style.background = "";
    p.style.color = "";
    p.style.border = "";
}


if (task_complete.length > 0) {
    c.style.background = "#22f80617";
    c.style.color = "#1eff00";
    c.style.border = "1px solid #1eff00";
} else {
    c.style.background = "";
    c.style.color = "";
    c.style.border = "";
}

}

function updatedEmptyMess() {

    if (TaskContainer.children.length === 0) {

        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('message-empty');
        emptyMessage.textContent = "No tasks available.";

        TaskContainer.appendChild(emptyMessage);
    }

}