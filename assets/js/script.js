const isLoggedIn = false;

document.querySelectorAll(".icon").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        if (this.getAttribute("data-require-login") === "true") {
            if (!isLoggedIn) {
                // Chuyển đến trang đăng nhập nếu chưa login
                window.location.href = "../pages/login.html";
            } else {
                const icon = this.querySelector("i");

                if (icon.classList.contains("fa-shopping-cart")) {
                    window.location.href = "../pages/cart.html";
                } else if (icon.classList.contains("fa-user")) {
                    window.location.href = "../pages/profile.html";
                } 
            }
        }
    });
});
