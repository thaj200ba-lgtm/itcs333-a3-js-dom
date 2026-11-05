(function () {

    // Get HTML elements
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    // Current filter
    let currentFilter = "all";

    // Update counter
    function updateCounter() {
        const items = todoList.querySelectorAll("li");
        let remaining = 0;

        items.forEach(function (item) {
            if (!item.classList.contains("completed")) {
                remaining++;
            }
        });

        counter.textContent =
            remaining + " item" + (remaining !== 1 ? "s" : "") + " left";
    }

    // Filter tasks
    function applyFilter() {
        const items = todoList.querySelectorAll("li");

        items.forEach(function (item) {
            const completed = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.hidden = false;
            } else if (currentFilter === "active") {
                item.hidden = completed;
            } else if (currentFilter === "done") {
                item.hidden = !completed;
            }
        });
    }

    // Add a new task
    function addTodo() {
        const taskText = input.value.trim();

        if (taskText === "") {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "item-text";
        span.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        li.appendChild(span);
        li.appendChild(deleteButton);

        todoList.appendChild(li);

        input.value = "";

        applyFilter();
        updateCounter();
    }

    // Submit form
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });

    // Event delegation
    todoList.addEventListener("click", function (event) {
        const deleteButton = event.target.closest(".delete-btn");
        const itemText = event.target.closest(".item-text");

        if (deleteButton) {
            const li = deleteButton.closest("li");
            li.remove();
        } else if (itemText) {
            const li = itemText.closest("li");
            li.classList.toggle("completed");
        }

        applyFilter();
        updateCounter();
    });

    // Show all tasks
    document.getElementById("filter-all")
        .addEventListener("click", function () {
            currentFilter = "all";
            applyFilter();
        });

    // Show active tasks
    document.getElementById("filter-active")
        .addEventListener("click", function () {
            currentFilter = "active";
            applyFilter();
        });

    // Show completed tasks
    document.getElementById("filter-done")
        .addEventListener("click", function () {
            currentFilter = "done";
            applyFilter();
        });

    // Initial setup
    errorMsg.classList.add("hidden");
    updateCounter();

})();
