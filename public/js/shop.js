const getQueryParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        name: urlParams.get("name") || "",
        price_min: urlParams.get("price_min") || "",
        price_max: urlParams.get("price_max") || "",
    };
};

const callApi = () => {
    let queryParams = getQueryParam();
    $.get(`/shop/products?name=${queryParams.name}&price_min=${queryParams.price_min}&price_max=${queryParams.price_max}`)
        .then((res) => {
            const productList = res.data;
            for (let i = 0; i < productList.length; i++) {
                let html = $(
                    `<div class="card">
                    <img src="${productList[i].hinhAnh}" alt="Denim Jeans" style="width: 100%" />
                    <h3>${productList[i].tenSP}</h3>
                    <p class="card-price">$${productList[i].giaTien}</p>
                    <button>View Detail</button>
                    </div>`
                );
                $("#productListView").append(html);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
callApi();

const validateInput = () => {
    let price_min = $("#price_min").val();
    let price_max = $("#price_max").val();
    if (isNaN(price_min) || isNaN(price_max)) {
        document.getElementById("errorInput").innerText = "Giá không hợp lệ";
        return false;
    }
    if (price_max && Number(price_max) < Number(price_min)) {
        document.getElementById("errorInput").innerText = "Giá không hợp lệ";
        return false;
    }
    return true;
};

const handleFilter = (event) => {
    event.preventDefault();
    let price_min = $("#price_min").val();
    let price_max = $("#price_max").val();
    if (validateInput()) {
        let queryParams = getQueryParam();
        window.location.href = `/shop?name=${queryParams.name}&price_min=${price_min}&price_max=${price_max}`;
    }
};

const handleFilterByName = (event) => {
    event.preventDefault();
    let name = $("#nameInput").val();
    let queryParams = getQueryParam();
    window.location.href = `/shop?name=${name}&price_min=${queryParams.price_min}&price_max=${queryParams.price_max}`;
};

const handleClearFilter = () => {
    window.location.href = "/shop";
};
