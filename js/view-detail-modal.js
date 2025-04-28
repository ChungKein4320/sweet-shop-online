document.addEventListener("DOMContentLoaded", () => {
    const detailButtons = document.querySelectorAll(".view-detail");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = button.dataset.price;
            const image = button.dataset.image;
            const description = button.dataset.description;

            // Reset số lượng về 1 khi mở modal
            const quantityInput = document.getElementById("quantity");
            quantityInput.value = 1;

            // Cập nhật nội dung modal
            document.getElementById("modalProductName").textContent = name;
            document.getElementById("modalProductImage").src = image;
            document.getElementById("modalProductImage").alt = name;
            document.getElementById("modalProductPrice").textContent = parseInt(price).toLocaleString() + "đ";
            document.getElementById("modalProductDesc").textContent = description;

            // Hiển thị modal
            const modalElement = document.getElementById("productDetailModal");
            const modal = new bootstrap.Modal(modalElement);
            modal.show();

            // Gắn lại handler cho nút "Thêm vào giỏ hàng"
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

                const quantity = parseInt(quantityInput.value) || 1;
                const existingIndex = cart.findIndex((item) => item.name === name);
                if (existingIndex >= 0) {
                    cart[existingIndex].quantity += quantity;
                } else {
                    cart.push({ name, price: parseFloat(price), image, quantity });
                }

                localStorage.setItem(cartKey, JSON.stringify(cart));
                alert("Đã thêm vào giỏ hàng!");

                modal.hide();
            };

            // Gắn nút + và - cho số lượng
            document.getElementById("btn-minus").onclick = () => {
                let val = parseInt(quantityInput.value);
                if (val > 1) quantityInput.value = val - 1;
            };

            document.getElementById("btn-plus").onclick = () => {
                let val = parseInt(quantityInput.value);
                quantityInput.value = val + 1;
            };
        });
    });
});
