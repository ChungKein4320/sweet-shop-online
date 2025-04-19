document.addEventListener("DOMContentLoaded", () => {
    const detailButtons = document.querySelectorAll(".view-detail");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = button.dataset.price;
            const image = button.dataset.image;
            const description = button.dataset.description;

            // Cập nhật nội dung modal
            document.getElementById("modalProductName").textContent = name;
            document.getElementById("modalProductImage").src = image;
            document.getElementById("modalProductImage").alt = name;
            document.getElementById("modalProductPrice").textContent = parseInt(price).toLocaleString() + "đ";
            document.getElementById("modalProductDesc").textContent = description;

            // Gắn lại handler cho nút "Thêm vào giỏ"
            const addBtn = document.getElementById("modalAddToCart");
            addBtn.onclick = () => {
                const email = localStorage.getItem("loggedInUser");
                if (!email) {
                    alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng.");
                    window.location.href = "../pages/login.html";
                    return;
                }

                const cartKey = `cart_${email}`;
                const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

                const existingIndex = cart.findIndex((item) => item.name === name);
                if (existingIndex >= 0) {
                    cart[existingIndex].quantity += 1;
                } else {
                    cart.push({ name, price: parseFloat(price), image, quantity: 1 });
                }

                localStorage.setItem(cartKey, JSON.stringify(cart));
                alert("Đã thêm vào giỏ hàng!");
                const modal = bootstrap.Modal.getInstance(document.getElementById("productDetailModal"));
                modal.hide();
            };

            // Hiển thị modal
            const modal = new bootstrap.Modal(document.getElementById("productDetailModal"));
            modal.show();
        });
    });
});
