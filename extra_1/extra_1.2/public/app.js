document.addEventListener("click", event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        console.log(id)
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }
    if (event.target.dataset.type === "update") {
        const id = event.target.dataset.id;
        const spanElement = event.target.closest("li").querySelector("span");
        const initValue = spanElement.textContent;

        const inputElement = document.createElement("input");
        inputElement.value = initValue;
        inputElement.name = "title";
        inputElement.type = "text";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Сохранить";
        saveButton.classList.add("btn", "btn-success", "btn-sm", "mx-1");
        saveButton.addEventListener("click", () => {
            const newTitle = inputElement.value;
            if (newTitle !== initValue) {
                edit(id, newTitle).then(() => {
                    event.target.closest("li").querySelector("span").textContent = newTitle;
                });
            }
            spanElement.hidden = false;
            updateButton.hidden = false;
            removeButton.hidden = false;
            saveButton.hidden = true;
            cancelButton.hidden = true;
            inputElement.hidden = true;
        })

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Отменить";
        cancelButton.classList.add("btn", "btn-danger", "btn-sm");
        cancelButton.addEventListener("click", () => {
            spanElement.hidden = false;
            updateButton.hidden = false;
            removeButton.hidden = false;
            saveButton.hidden = true;
            cancelButton.hidden = true;
            inputElement.hidden = true;
        })

        const [updateButton, removeButton] = event.target.closest("div").querySelectorAll("button");
        spanElement.hidden = true;
        updateButton.hidden = true;
        removeButton.hidden = true;
        event.target.closest("li").prepend(inputElement);
        event.target.closest("li").querySelector("div").append(saveButton, cancelButton);
    }
})

async function edit(id, title) {
    await fetch(`/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ title, id })
    });
}

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    });
}