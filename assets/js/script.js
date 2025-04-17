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

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
  slides[currentIndex].style.display = "none";
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].style.display = "block";
}

setInterval(showNextSlide, 3000); // 2 giây
