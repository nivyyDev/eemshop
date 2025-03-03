document.addEventListener("DOMContentLoaded", function () {

  function renderCartArticles() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let container = document.getElementById("cart-items-list");

    // Keep the Shopping Cart title
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0">Shopping Cart</h3>
        </div>`;

    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML += "<p>Your cart is empty.</p>";
        document.getElementById("total-price").textContent = "$0.00"; // Update total price
        updateCartCounter();
        return;
    }

    cart.forEach(product => {
        let itemTotal = product.price * product.quantity;
        totalPrice += itemTotal;

        let html = `
            <div class="card rounded-3 mb-4">
                <div class="card-body p-4">
                  <div class="row d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                      <img src="${product.image}" class="img-fluid rounded-3" alt="${product.name}">
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <p class="lead fw-normal mb-2">${product.name}</p>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button class="btn btn-link px-2 minus" data-id="${product.id}">
                        <i class="fas fa-minus"></i>
                      </button>
                      <input min="1" name="quantity" value="${product.quantity}" type="number" class="form-control form-control-sm input-quantity" data-id="${product.id}">
                      <button class="btn btn-link px-2 plus" data-id="${product.id}">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 class="mb-0 price" data-id="${product.id}">$${itemTotal.toFixed(2)}</h5>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <button class="remove-from-cart" data-id="${product.id}" style="border: none; background-color: #fff;">
                        <a class="text-danger"><i class="fas fa-trash fa-lg" style="font-size: 30px; color:rgb(186, 3, 3);"></i></a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;

        container.insertAdjacentHTML('beforeend', html);
    });

    document.getElementById("total-price").textContent = `$${totalPrice.toFixed(2)}`; // Update total price

    attachEventListeners();
    updateCartCounter();
}


  function attachEventListeners() {
      document.querySelectorAll(".remove-from-cart").forEach(button => {
          button.addEventListener("click", function () {
              const productId = this.getAttribute("data-id");
              removeFromCart(productId);
          });
      });

      document.querySelectorAll(".plus").forEach(button => {
          button.addEventListener("click", function () {
              const productId = button.getAttribute("data-id");
              updateQuantity(productId, 1);
          });
      });

      document.querySelectorAll(".minus").forEach(button => {
          button.addEventListener("click", function () {
              const productId = button.getAttribute("data-id");
              updateQuantity(productId, -1);
          });
      });

      document.querySelectorAll(".input-quantity").forEach(input => {
          input.addEventListener("change", function () {
              const productId = input.getAttribute("data-id");
              const value = parseInt(input.value);
              updateQuantity(productId, value, true);
          });
      });
  }

  function removeFromCart(productId) {
      let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      renderCartArticles();
  }

  function updateQuantity(productId, change, isDirectInput = false) {
      let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      let product = cart.find(item => item.id === productId);

      if (product) {
          if (isDirectInput) {
              product.quantity = change;
          } else {
              product.quantity += change;
          }

          if (product.quantity < 1) {
              cart = cart.filter(item => item.id !== productId);
          } 

          localStorage.setItem("cartItems", JSON.stringify(cart));
      }

      renderCartArticles();
  }

  function updateCartCounter() {
      let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById("cart-count").textContent = totalItems;
  }

  renderCartArticles();
});
