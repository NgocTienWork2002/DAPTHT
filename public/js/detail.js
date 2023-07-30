function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
}

function toast(message) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");
        const autoRemove = setTimeout(() => {
            main.removeChild(toast);
        }, 3000);
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
            }
        };
        toast.classList.add("toast", "toast--success");
        toast.style.animation = `ShowToast ease 0.3s, ClearToast linear 1s 2s forwards`;
        toast.innerHTML = `
          <div class="toast__icon">
              <i class="fas fa-check-circle"></i>
          </div>
          <div class="toast__body">
              <h3 class="toast__title">Success</h3>
              <p class="toast__msg">${message}<a href="/shoppingcart" class="toast__view">View Cart</a></p>
          </div>
          <div class="toast__close">
              <i class="fas fa-times"></i>
          </div>
      `;
        main.appendChild(toast);
    }
}

const handleAddToCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const quantity = $("#quantityInput").val();
    if (cart) {
        let product = cart.find((item) => item.id === id);
        if (product) {
            toast("Products already in the cart");
        } else {
            cart.push({ id, quantity });
            localStorage.setItem("cart", JSON.stringify(cart));
            toast("Add to cart successfully");
        }
    } else {
        let listProduct = [{ id, quantity }];
        localStorage.setItem("cart", JSON.stringify(listProduct));
        toast("Add to cart successfully");
    }
};
