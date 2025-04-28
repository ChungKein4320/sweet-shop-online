document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-add-to-cart');
    const loggedInEmail = localStorage.getItem('loggedInUser');

    // Không cho thêm nếu chưa login
    if (!loggedInEmail) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng!");
                window.location.href = "../html/login.html";
            });
        });
        return;
    }

    const cartKey = `cart_${loggedInEmail}`;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

            const existingIndex = cart.findIndex(item => item.name === name);
            if (existingIndex >= 0) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem(cartKey, JSON.stringify(cart));
            alert(`Đã thêm "${name}" vào giỏ hàng!`);
        });
    });
});
