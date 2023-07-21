{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const changeAllTasksDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";


        for (const task of tasks) {
            htmlString += `
                    <li
                        class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""}"
                    > 
                        <button class="js-done list__button list__button--checked">
                            ${task.done ? "✔" : ""}
                        </button>
                        <span class="list__content${task.done ? " list__content--done" : ""}">
                            ${task.content}
                        </span>
                        <button class="js-remove list__button list__button--remove"><i class="fa fa-trash"></i></button>
                    </li>
                `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if(!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="section__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="section__button js-changeAllDone" ${tasks.every(({done}) => done) ? " disabled" : ""}>
                Ukończ wszystkie
            </button>   
        `
    };

    const bindButtonsEvents = () => {
        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if(toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }

        const changeAllDoneButton = document.querySelector(".js-changeAllDone");

        if(changeAllDoneButton) {
            changeAllDoneButton.addEventListener("click", changeAllTasksDone);
        }
    };


    const render = () => {

        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");

        const newTaskContent = newTaskElement.value.trim();

        newTaskElement.focus();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        newTaskElement.value = "";

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}