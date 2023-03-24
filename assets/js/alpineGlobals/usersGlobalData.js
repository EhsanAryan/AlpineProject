document.addEventListener("alpine:init", () => {
    Alpine.data("usersData", () => ({
        initUsers: [],
        users: [],
        pageUsers: [],
        isLoading: false,
        showAddUserModal: false,
        pagesCount: 1,
        currentPage: 1,
        itemsCount: 5,
        searchChar: "",
        newUserInfo: {
            name: "",
            username: "",
            email: ""
        },
        getUsers() {
            this.isLoading = true;
            axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if(response.status === 200) {
                    this.initUsers = response.data;
                    this.users = response.data;
                    this.setPagination();
                } else {
                    swal({
                        title: `Error ${response.status}`,
                        text: "An error occurred!",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                swal({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
            })
            .finally(() => {
                this.isLoading = false;
            });
        },
        setPagination() {
            this.pagesCount = Math.ceil(this.users.length / this.itemsCount);
            const startIndex = (this.currentPage - 1) * this.itemsCount;
            const endIndex = this.currentPage * this.itemsCount;
            this.pageUsers = this.users.slice(startIndex, endIndex);
        },
        setItemsCount(ev) {
            const itemsCnt = Math.ceil(Number(ev.target.value));
            if(itemsCnt < 1) {
                this.itemsCount = 1;
            }
            else if(itemsCnt > 20) {
                this.itemsCount = 20;
            } 
            else {
                this.itemsCount = itemsCnt;
            }
            this.currentPage = 1;
            this.setPagination();
        },
        nextPage() {
            this.currentPage++;
            this.setPagination();
        },
        prevPage() {
            this.currentPage--;
            this.setPagination();
        },
        handleSearchUsers() {
            const value = this.searchChar.toLowerCase();
            this.users = [...this.initUsers].filter(u => u.name.toLowerCase().includes(value) || 
                u.username.toLowerCase().includes(value) || u.email.toLowerCase().includes(value));
            this.currentPage = 1;
            this.setPagination();
        },
        handleAddNewUser() {
            axios.post("https://jsonplaceholder.typicode.com/users", this.newUserInfo)
            .then((response) => {
                if(response.status === 201) {
                    this.initUsers.push(response.data);
                    swal({
                        title: `Done!`,
                        text: "New user has been added.",
                        icon: "success"
                    });
                    this.newUserInfo = {
                        name: "",
                        username: "",
                        email: ""
                    };
                    this.showAddUserModal = false;
                    this.currentPage = 1;
                    this.searchChar = "";
                    this.handleSearchUsers();
                } else {
                    swal({
                        title: `Error ${response.status}`,
                        text: "An error occurred!",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                swal({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
            });
        },
        deleteUser(userId) {
            swal({
                title: "Warning",
                text: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((result) => {
                if(result) {
                    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
                    .then((response) => {
                        if(response.status === 200) {
                            this.initUsers = this.initUsers.filter(u => u.id != userId);
                            swal({
                                title: `Done!`,
                                text: "User has been deleted.",
                                icon: "success"
                            });
                            this.currentPage = 1;
                            this.searchChar = "";
                            this.handleSearchUsers();
                        } else {
                            swal({
                                title: `Error ${response.status}`,
                                text: "An error occurred!",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        swal({
                            title: "Error!",
                            text: error.message,
                            icon: "error"
                        });
                    });
                }
            });
        },
        editUser(userId) {
            console.log(`Edit: ${userId}`);
        }
    }));
});