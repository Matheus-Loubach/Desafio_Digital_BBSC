const cartList = document.getElementById("cartList");
const cartSize = document.getElementById('cartSize');

const cart = JSON.parse(localStorage.getItem('cart')) || [];
cartSize.innerHTML = `${cart.length}`;

// Render cart items
function renderCart() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.map(product => {

        // Create an HTML element for each product in the cart
        const li = document.createElement("li");

        // Product name
        const productName = document.createElement("h2");
        productName.innerHTML = product.title;
        li.appendChild(productName);

        // Image
        const productImg = document.createElement("img");
        productImg.src = product.img;
        productImg.alt = "Burger Photo";
        li.appendChild(productImg);

        // Price
        const productPrice = document.createElement("p");
        productPrice.innerHTML = `R$${product.price}`;
        li.appendChild(productPrice);

        // Quantity
        const quantity = document.createElement("p");
        quantity.innerHTML = `Quantidade: ${product.quantidade}`;
        li.appendChild(quantity);

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "Remover";
        removeBtn.addEventListener("click", function () {
            removeProduct(product.id);
        });
        li.appendChild(removeBtn);

        cartList.appendChild(li);
    });
}

// Remove a product from the cart
function removeProduct(id) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Clear the list
    cartList.innerHTML = '';

    // Update the cart size
    cartSize.innerHTML = `${updatedCart.length}`;

    // Update the product list
    updateTotal();
    renderCart();
}

// Calculate the total cart value
function updateTotal() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalProducts  = document.createElement('p');
    const p = document.getElementById("total");
    let totalValue  = 0;

    cart.forEach((item) => {
        totalValue  += item.price * item.quantidade;
    });

    totalValue  <= 0 ? totalProducts.innerHTML = "Nenhum item no carrinho" : totalProducts.innerHTML = `Valor total: R$ ${totalValue}`

    // Remove the old element from the DOM, if it exists
    if (p.firstChild) {
        p.removeChild(p.firstChild);
    }

    p.appendChild(totalProducts);

}



renderCart();
updateTotal();

