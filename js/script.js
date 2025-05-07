document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const products = document.querySelectorAll(".product__panel-item");

    searchInput.addEventListener("input", function () {
        const keyword = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = "";
        let count = 0;

        if (keyword === "") {
            searchResults.style.display = "none";
            return;
        }

        products.forEach((product) => {
            const name = product.querySelector(".product__panel-link").textContent.toLowerCase();
            const price = product.querySelector(".product__panel-price-current")?.textContent.trim();
            const image = product.querySelector(".product__panel-img")?.src;

            if (name.includes(keyword) && count < 5) {
                const item = document.createElement("a");
                item.href = "#";
                item.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

                item.innerHTML = `
                                <div>
                                    <div class="fw-bold">${name}</div>
                                    <div class="text-muted">${price}</div>
                                </div>
                                <img src="${image}" alt="${name}" style="width: 50px; height: auto;" />
                            `;
                searchResults.appendChild(item);
                count++;
            }
        });

        if (count > 0) {
            searchResults.style.display = "block";
        } else {
            searchResults.innerHTML = '<div class="list-group-item text-muted">Không tìm thấy sản phẩm</div>';
            searchResults.style.display = "block";
        }
    });

    // Ẩn danh sách khi click ra ngoài
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".search-bar")) {
            searchResults.style.display = "none";
        }
    });
});
