document.addEventListener("DOMContentLoaded", () => {
    const loggedInEmail = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (loggedInEmail && users[loggedInEmail]) {
        const user = users[loggedInEmail];
        const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
        const userLink = document.getElementById("user");
        const userLabel = document.getElementById("userLabel");
        if (userLabel && userLink) {
            userLabel.textContent = `Chào ${fullName}`;
            userLink.href = "#";
            userLink.addEventListener("click", (e) => {
                e.preventDefault();
                if (confirm("Bạn có muốn đăng xuất không?")) {
                    localStorage.removeItem("loggedInUser");
                    window.location.reload();
                }
            });
        } else {
            console.warn("User elements not found in the DOM");
        }
    } else {
        console.log("User not logged in or missing user data");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const cartLink = document.getElementById("cart");

    cartLink.addEventListener("click", function (event) {
        event.preventDefault();

        const loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            // Nếu có loggedInUser => đã đăng nhập
            window.location.href = "../pages/cart.html";
        } else {
            // Ngược lại thì chuyển sang đăng nhập
            window.location.href = "../pages/login.html";
        }
    });
});
