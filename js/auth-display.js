document.addEventListener("DOMContentLoaded", () => {
    const loggedInEmail = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const userContainer = document.getElementById("userContainer");
    const userLink = document.getElementById("user");
    const userLabel = document.getElementById("userLabel");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const logoutBtn = document.getElementById("logout");
    const viewOdertBtn = document.getElementById("viewOder");
    if (loggedInEmail && users[loggedInEmail]) {
        const user = users[loggedInEmail];
        const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
        // Update UI
        userLabel.textContent = `Chào ${fullName}`;
        userLink.href = "";
        userContainer.classList.add("logged-in");
        // Prevent link navigation
        userLink.addEventListener("click", (e) => e.preventDefault());
        // Logout logic
        logoutBtn.addEventListener("click", () => {
            if (confirm("Bạn có muốn đăng xuất không?")) {
                localStorage.removeItem("loggedInUser");
                window.location.reload();
            }
        });
        // View cart
        viewOdertBtn.addEventListener("click", () => {
            window.location.href = "../pages/oders.html";
        });
    } else {
        // Not logged in
        userLabel.textContent = "Đăng nhập / Đăng ký";
        userLink.href = "../pages/login.html";
        userContainer.classList.remove("logged-in");
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
