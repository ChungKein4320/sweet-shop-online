document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("loggedInUser");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderList = document.getElementById("orderList");

    if (!email) {
        orderList.innerHTML = `<p class="text-center">Vui lòng <a href="login.html">đăng nhập</a> để xem đơn hàng.</p>`;
        return;
    }

    const userOrders = orders.filter((order) => order.user === email);

    if (userOrders.length === 0) {
        orderList.innerHTML = `<p class="text-center">Bạn chưa có đơn hàng nào.</p>`;
        return;
    }

    let html = "";

    userOrders.forEach((order, index) => {
        let orderTotal = 0;
        let itemsHtml = order.items
            .map((item) => {
                const itemTotal = item.price * item.quantity;
                orderTotal += itemTotal;
                return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toLocaleString()}đ</td>
                    <td>${itemTotal.toLocaleString()}đ</td>
                </tr>
            `;
            })
            .join("");

        html += `
            <div class="card mb-4">
                <div class="card-header bg-light">
                    <strong>Đơn hàng #${index + 1}</strong> - Ngày: ${order.date}
                </div>
                <div class="card-body">
                    <p><strong>Người nhận:</strong> ${order.name}</p>
                    <p><strong>SĐT:</strong> ${order.phone}</p>
                    <p><strong>Địa chỉ:</strong> ${order.address}</p>
                    ${order.note ? `<p><strong>Ghi chú:</strong> ${order.note}</p>` : ""}

                    <table class="table table-bordered text-center">
                        <thead class="table-danger">
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>

                    <div class="text-end">
                        <strong>Tổng đơn hàng: ${orderTotal.toLocaleString()}đ</strong>
                    </div>
                </div>
            </div>
        `;
    });

    orderList.innerHTML = html;
});
