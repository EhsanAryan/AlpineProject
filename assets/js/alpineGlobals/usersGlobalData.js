document.addEventListener("alpine:init", () => {
    Alpine.data("usersData", () => ({
        users: [],
        getUsers() {
            axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                 if(response.status === 200) {
                    this.users = response.data;
                 } else {
                    alert(`Error!\nStatus code: ${response.status}`);
                 }
            })
            .catch((error) => {
                alert(error);
            })
        }
    }));
});