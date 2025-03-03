document.addEventListener("DOMContentLoaded", function () {
    

    let cartCountElement = document.getElementById("cart-count");


    function getCartCount() {
        return localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
    }

    /*function updateCartCount(count) {
        localStorage.setItem("cartCount", count);
        cartCountElement.textContent = count;
    }*/
    
    updateCartCount();
    
    function addToCart(event) {
        event.preventDefault();
    
        const productCard = event.target.closest(".product");
        if (!productCard) {
            console.error("Error: Could not find product.");
            return;
        }

        console.log(productCard);
    
        const productID = productCard.querySelector(".product-id")?.textContent.trim() || "unknown";
        const productName = productCard.querySelector(".product-name")?.textContent.trim() || "Unknown Product";
        const productPriceText = productCard.querySelector(".product-price")?.textContent.trim();
        const productPrice = productPriceText ? parseFloat(productPriceText.replace("$", "")) : 0;
        const productImage = productCard.querySelector(".card-img-top")?.src || "";
    
        console.log("Extracted Product Details:");
        console.log("ID:", productID);
        console.log("Name:", productName);
        console.log("Price:", productPrice);
        console.log("Image:", productImage);
    
        if (productID === "unknown" || productName === "Unknown Product" || productPrice === 0) {
            console.error("Error: One or more product details could not be extracted.");
            return;
        }
    
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
        let newItem = {
            id: productID,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
    
        let existingItem = cartItems.find(item => item.id === newItem.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(newItem);
        }
    
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartCount();
    }
    
    function updateCartCount() {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        document.getElementById("cart-count").textContent = totalItems;
    }
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    let addToCartButtons = document.querySelectorAll(".add-to-cart, .btn-outline-dark.flex-shrink-0");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCart);
    });

    
    let cartButton = document.querySelector("a[href*='cart.html']");
    if (cartButton) {
        cartButton.addEventListener("click", function (event) {
            event.stopPropagation(); 
        });
    } 
});

