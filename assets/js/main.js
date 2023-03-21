document.addEventListener("DOMContentLoaded", () => {
    const addUserBtn = document.getElementById("add-user-btn");
    const modalBack = document.querySelector(".add-user-modal-back");
    const modalBox = document.querySelector(".add-user-modal-box");

    addUserBtn.addEventListener("click", () => {
        console.log(modalBack)
        modalBack.classList.remove("d-none");
        setTimeout(() => {
            modalBack.classList.add("opacity-1");
            modalBox.classList.add("show");
        }, 10);
    });

    modalBack.addEventListener("click", (ev) => {
        modalBox.classList.remove("show");
        modalBack.classList.remove("opacity-1");
        setTimeout(() => {
            modalBack.classList.add("d-none");
        }, 250);
    });

    modalBox.addEventListener("click", (ev) => {
        ev.stopPropagation();
    });

    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            let tableRows = "";
            for(let user of users) {
                const userRow = `
                <tr>
                    <th scope="row">${user.id}</th>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.address.city} ${user.address.street} ${user.address.suite}</td>
                    <td>
                        <i class="fa-solid fa-pen text-primary mx-1 pointer hoverable-text scalable"></i>
                        <i class="fa-solid fa-trash text-danger mx-1 pointer hoverable-text scalable"></i>
                    </td>
                </tr>`
                tableRows += userRow;
                document.querySelector("#users-table tbody").innerHTML = tableRows;
            }
        })
    }, 3000);

});