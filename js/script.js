document.addEventListener("DOMContentLoaded", function () {
    const userContainer = document.getElementById("userContainer");
    const userButton = document.getElementById("user");

    userButton.addEventListener("click", function (e) {
        e.preventDefault(); // Ngăn chuyển trang (vì nó là thẻ <a>)
        e.stopPropagation();
        userContainer.classList.toggle("show");
    });

    // Click ra ngoài thì ẩn dropdown
    document.addEventListener("click", function (e) {
        if (!userContainer.contains(e.target)) {
            userContainer.classList.remove("show");
        }
    });
});
