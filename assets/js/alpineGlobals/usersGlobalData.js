document.addEventListener("alpine:init", () => {
    Alpine.data("usersData", () => ({
        users: [],
        pageUsers: [],
        isLoading: false,
        showAddUserModal: false,
        pagesCount: 1,
        currentPage: 1,
        itemsCount: 4,
        getUsers() {
            this.isLoading = true;
            axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if(response.status === 200) {
                    this.users = response.data;
                    this.setPagination();
                } else {
                    alert(`Error!\nStatus code: ${response.status}`);
                }
            })
            .catch((error) => {
                alert(error);
            });
            this.isLoading = false;
        },
        setPagination() {
            this.pagesCount = Math.ceil(this.users.length / this.itemsCount);
            const startIndex = (this.currentPage - 1) * this.itemsCount;
            const endIndex = this.currentPage * this.itemsCount;
            this.pageUsers = this.users.slice(startIndex, endIndex);
        },
        setItemsCount(ev) {
            const itemsCnt = Number(ev.target.value);
            if(itemsCnt < 1) {
                this.itemsCount = 1;
            }
            else if(itemsCnt > 20) {
                this.itemsCount = 20;
            } 
            else {
                this.itemsCount = itemsCnt;
            }
            this.setPagination();
        },
        increaseCurrentPage() {
            this.currentPage = this.currentPage + 1;
            this.setPagination();
        },
        decreaseCurrentPage() {
            this.currentPage = this.currentPage - 1;
            this.setPagination();
        },
        deleteUser(userId) {
            console.log(`Delete: ${userId}`);
        },
        editUser(userId) {
            console.log(`Edit: ${userId}`);
        }
    }));
});