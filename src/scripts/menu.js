import list from '../../data/data.js';

const cartList = document.getElementById("cartList");
const cartSize = document.getElementById('cartSize');
const cart = JSON.parse(localStorage.getItem('cart')) || [];
cartSize.innerHTML = `${cart.length}`;


// Menu structure
list.map(product => {
  const li = document.createElement("li");

  const h2 = document.createElement("h2");
  h2.innerText = product.title;
  li.appendChild(h2);

  const pImage = document.createElement("img");
  pImage.src = product.img;
  pImage.alt = "Hamburger Image";
  li.appendChild(pImage);

  const pPrice = document.createElement("p");
  pPrice.innerText = "Preço: R$ " + product.price;
  li.appendChild(pPrice);

  const addButton = document.createElement("button");
  addButton.innerText = "Adicionar ao carrinho";
  addButton.addEventListener("click", function () {
    checkCart(product);
  });
  li.appendChild(addButton);

  cartList.appendChild(li);
});


// Adds product to cart
function checkCart(product) {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  try {

    if (product) {
      const message = document.getElementById("message");
      message.innerHTML = "Produto Adicionado";
      setTimeout(() => {
        message.innerHTML = "";
      }, 2000); // remove message after 2 seconds (2000 ms)
    }

    // Checks if product is already in cart
    const productInCart = cart.filter(item => item.id === product.id)[0];
    productInCart ? productInCart.quantidade++ : cart.push({ ...product, quantidade: 1 });

    setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
      cartSize.innerHTML = `${cart.length}`;
    }, 300);
  } catch (error) {
    alert("Erro ao adicionar o produto, tente novamente mais tarde");
  }

}
