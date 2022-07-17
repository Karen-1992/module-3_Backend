document.addEventListener("click", event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        console.log(id)
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }
    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        console.log(id);
        const newTitle = prompt("Введите новое название");
        if (newTitle) {
            console.log(newTitle);
            edit(id, newTitle).then(() => {
                event.target.closest("li").querySelector("span").textContent = newTitle;
            });
        }
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