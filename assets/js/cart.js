document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cartContainer");
    const loggedInEmail = localStorage.getItem("loggedInUser");

    if (!loggedInEmail) {
        cartContainer.innerHTML = `<p class="text-center">Vui lòng <a href="login.html">đăng nhập</a> để xem giỏ hàng.</p>`;
        return;
    }

    const cartKey = `cart_${loggedInEmail}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-center">Giỏ hàng của bạn đang trống.</p>`;
        return;
    }

    let total = 0;
    let tableHTML = `
      <table class="table table-bordered text-center">
        <thead class="table-danger">
          <tr>
            <th>Hình ảnh</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
    `;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        tableHTML += `
          <tr>
            <td><img src="${item.image}" width="60" /></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}đ</td>
            <td>${item.quantity}</td>
            <td>${itemTotal.toLocaleString()}đ</td>
            <td>
              <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Xóa</button>
            </td>
          </tr>
        `;
    });

    tableHTML += `
        </tbody>
      </table>
      <div class="text-end">
        <h5>Tổng cộng: <strong>${total.toLocaleString()}đ</strong></h5>
        <a href="checkout.html" class="btn btn-success">Tiến hành thanh toán</a>
      </div>
    `;

    cartContainer.innerHTML = tableHTML;
});

// Hàm xóa
function removeFromCart(index) {
    const loggedInEmail = localStorage.getItem("loggedInUser");
    const cartKey = `cart_${loggedInEmail}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    location.reload();
}
