document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("loggedInUser");
    const cartKey = `cart_${email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartContainer = document.getElementById("checkoutCart");

    if (!email || cart.length === 0) {
        cartContainer.innerHTML = `<p>Không có sản phẩm nào trong giỏ hàng.</p>`;
        document.getElementById("checkoutForm").style.display = "none";
        return;
    }

    let total = 0;
    let html = `
        <table class="table table-bordered text-center">
            <thead class="table-danger">
                <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}đ</td>
                <td>${item.quantity}</td>
                <td>${itemTotal.toLocaleString()}đ</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <h5 class="text-end">Tổng cộng: <strong>${total.toLocaleString()}đ</strong></h5>
    `;

    cartContainer.innerHTML = html;
});

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = localStorage.getItem("loggedInUser");
    const cartKey = `cart_${email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const order = {
        user: email,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        note: document.getElementById("note").value,
        items: cart,
        date: new Date().toLocaleString(),
    };

    // Lưu đơn hàng
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Xóa giỏ hàng
    localStorage.removeItem(cartKey);

    alert("Đặt hàng thành công!");
    window.location.href = "../pages/index.html"; 
});
