const amountArray = [];
const ul = document.querySelector(".productsCartList");

// Header Scroll Color Change
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

// Menu
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
// Remove Menu On Scroll
window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};
// Open Modal Cart
const cartBtn = document
  .querySelector(".nav-icons .cart")
  .addEventListener("click", openModalCart);

function openModalCart() {
  const containerModalCart = document.querySelector("#containerModalCart");
  containerModalCart.classList.add("containerModalCart");
  document.documentElement.style.overflow = "hidden";
  checkedCartEmpty();
}
// Checked Cart Empty
function checkedCartEmpty() {
  const ulCart = document.querySelector(".productsCartList");
  const descriptionCartMenu = document.getElementsByClassName(
    "descriptionCartMenu"
  )[0];
  if (ulCart.children.length !== 0) {
    const alertCartEmpty = document.getElementById("alertCartEmpty");
    descriptionCartMenu.style.display = "flex";
    document.querySelector("#checkoutBtn").classList.remove("none");
    alertCartEmpty.classList.add("none");
  } else {
    descriptionCartMenu.style.display = "none";
    document.querySelector("#checkoutBtn").classList.add("none");
    alertCartEmpty.classList.remove("none");
  }
}
// Exit Modal Cart
const exitMenuCartBtn = document
  .querySelector("#exitMenuCartBtn")
  .addEventListener("click", exitMenuCart);

document
  .querySelector("#alertCartEmpty button")
  .addEventListener("click", exitMenuCart);

function exitMenuCart() {
  const containerModalCart = document.querySelector("#containerModalCart");
  containerModalCart.classList.remove("containerModalCart");
  containerModalCart.classList.add("none");
  document.documentElement.style.overflow = "scroll";
}
document
  .getElementById("containerModalCart")
  .addEventListener("click", function (ev) {
    if (ev.target === this) {
      const containerModalCart = document.getElementById("containerModalCart");
      containerModalCart.classList.remove("containerModalCart");
      containerModalCart.classList.add("none");
      document.documentElement.style.overflow = "scroll";
    }
  });
// Update Total Price
function updateTotalCart() {
  const productCart = document.getElementsByClassName("productCart");
  let totalPriceCart = 0;
  for (let i = 0; i < productCart.length; i++) {
    const productPrice = productCart[i]
      .querySelector("h3")
      .textContent.replace("$", "");

    const amountProduct = productCart[i].querySelector(
      ".amountProduct .valueAmount"
    ).textContent;

    totalPriceCart += productPrice * amountProduct;
  }
  const formater = new Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
  });

  const priceTotalCart = (document.getElementById(
    "priceTotalCart"
  ).innerText = `Total: ${formater.format(totalPriceCart)}`);

  const amountItensCart = document.getElementById("amountItensCart");
  const ulCart = document.querySelector(".productsCartList");
  amountItensCart.innerText = ulCart.children.length;

  if (ul.children.length > 2) {
    for (let i = 0; i < ul.children.length; i++) {
      const amountIten =
        +ul.children[i].querySelector(".valueAmount").textContent;
      amountArray.push(amountIten);
    }
    mostWanteditems();
  }
}

// Remove Product Cart
const removeProductCartBtn = document.getElementsByClassName("fa-trash");
for (let i = 0; i < removeProductCartBtn.length; i++) {
  updateTotalCart();
  mostWanteditems();
  removeProductCartBtn[i].addEventListener("click", removeProductCart);
}

function removeProductCart(ev) {
  ev.target.parentElement.remove();
  updateTotalCart();
  checkedCartEmpty();

  if (ul.children.length > 2) {
    for (let i = 0; i < ul.children.length; i++) {
      const amountIten =
        +ul.children[i].querySelector(".valueAmount").textContent;
      amountArray.push(amountIten);
    }
    mostWanteditems();
  }
}

// Add and Remove Amount Product
const addAmountProductBtn = document.getElementsByClassName("addAmountProduct");
const removeAmountProductBtn = document.getElementsByClassName(
  "removeAmountProduct"
);
for (let i = 0; i < addAmountProductBtn.length; i++) {
  addAmountProductBtn[i].addEventListener("click", addAmountProduct);
  removeAmountProductBtn[i].addEventListener("click", removeAmountProduct);
  mostWanteditems();
}
function addAmountProduct(ev) {
  let valueAmount =
    +ev.target.parentElement.querySelector(".valueAmount").innerText;
  valueAmount++;
  ev.target.parentElement.querySelector(".valueAmount").innerText = valueAmount;
  updateTotalCart();

  if (ul.children.length > 2) {
    for (let i = 0; i < ul.children.length; i++) {
      const amountIten =
        +ul.children[i].querySelector(".valueAmount").textContent;
      amountArray.push(amountIten);
    }
    mostWanteditems();
  }
}
function removeAmountProduct(ev) {
  let valueAmount =
    +ev.target.parentElement.querySelector(".valueAmount").innerText;
  if (valueAmount === 1) {
    ev.target.parentElement.parentElement.remove();
  }
  valueAmount--;
  ev.target.parentElement.querySelector(".valueAmount").innerText = valueAmount;
  updateTotalCart();
  checkedCartEmpty();

  if (ul.children.length > 2) {
    for (let i = 0; i < ul.children.length; i++) {
      const amountIten =
        +ul.children[i].querySelector(".valueAmount").textContent;
      amountArray.push(amountIten);
    }
    mostWanteditems();
  }
}

// Add Product Cart
const productsCartList = document.getElementsByClassName("productsCartList");
const addProductCartBtn = document.getElementsByClassName("bx-cart-alt");

for (let i = 0; i < addProductCartBtn.length; i++) {
  updateTotalCart();
  addProductCartBtn[i].addEventListener("click", addProductCart);
}

function addProductCart(ev) {
  const product = ev.target.parentElement.parentElement;
  const img = product.querySelector("img").src;
  const name = product.querySelector("h2").textContent;
  const price = product.querySelector(".alignPrice-btn span").textContent;

  const ulCart = document.querySelector(".productsCartList");
  const namesExistingProductCart = ulCart.getElementsByClassName("nameProduct");

  for (let i = 0; i < namesExistingProductCart.length; i++) {
    if (namesExistingProductCart[i].innerText === name) {
      let valueAmount =
        +namesExistingProductCart[
          i
        ].parentElement.parentElement.getElementsByClassName("valueAmount")[0]
          .textContent;
      valueAmount++;
      namesExistingProductCart[
        i
      ].parentElement.parentElement.getElementsByClassName(
        "valueAmount"
      )[0].innerText = valueAmount;
      updateTotalCart();
      return;
    }
  }

  const newLiCart = document.createElement("li");
  newLiCart.classList = "productCart";
  newLiCart.innerHTML = `
  <span>
                        <img src="${img}" alt="${name}">
                        <p class="nameProduct">${name}</p>
                    </span>
                    <span class="amountProduct">
                        <button class="removeAmountProduct">-</button>
                        <p class="valueAmount">1</p>
                        <button class="addAmountProduct">+</button>
                    </span>
                    <h3>${price}</h3>
                    <i class="fa-solid fa-trash"></i>
  `;
  ulCart.appendChild(newLiCart);
  updateTotalCart();
  newLiCart
    .querySelector(".amountProduct .removeAmountProduct")
    .addEventListener("click", removeAmountProduct);
  newLiCart
    .querySelector(".amountProduct .addAmountProduct")
    .addEventListener("click", addAmountProduct);
  newLiCart
    .querySelector(".fa-trash")
    .addEventListener("click", removeProductCart);

  if (ul.children.length > 2) {
    for (let i = 0; i < ul.children.length; i++) {
      const amountIten =
        +ul.children[i].querySelector(".valueAmount").textContent;
      amountArray.push(amountIten);
    }
    mostWanteditems();
  }
}
// Most Wanted Items

if (ul.children.length > 3) {
  for (let i = 0; i < ul.children.length; i++) {
    mostWanteditems();
    const amountIten =
      +ul.children[i].querySelector(".valueAmount").textContent;
    amountArray.push(amountIten);
  }
}

function mostWanteditems() {
  let a = [];

  let max = Math.max(...amountArray);
  max = amountArray.indexOf(max);
  a.push(+amountArray.splice(max, 1));

  max = Math.max(...amountArray);
  max = amountArray.indexOf(max);
  a.push(+amountArray.splice(max, 1));

  max = Math.max(...amountArray);
  max = amountArray.indexOf(max);
  a.push(+amountArray.splice(max, 1));

  let numberId = 1;
  a.forEach(function (ev) {
    for (let i = 0; i < ul.children.length; i++) {
      const amountIten =
        ul.children[i].querySelector(".valueAmount").textContent;
      if (numberId <= 3) {
        if (+amountIten === ev) {
          const mostDesiredProduct =
            ul.children[i].querySelector(".valueAmount").parentElement
              .parentElement;
          const img = mostDesiredProduct.querySelector("img").src;
          const name =
            mostDesiredProduct.querySelector(".nameProduct").textContent;
          const price = mostDesiredProduct.querySelector("h3").textContent;
          const box = document.querySelector(`#box${numberId}`);
          box.innerHTML = `
           <img src="${img}" alt="${name}">
           <h2>${name}</h2>
           <div class="alignPrice-btn">
                  <span>${price}</span>
                 <i class='bx bx-cart-alt' ></i>
           </div>
          `;
          const addCartBtn = box.querySelector(".bx-cart-alt");
          addCartBtn.addEventListener("click", addProductCart);

          numberId++;
        }
      }
    }
  });
}
