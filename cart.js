let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
//Additionate the number of items to display it on the cart icon
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
//Adding data to the home page of the shopping cart
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search; //Destructuring the object
        return `
        <div class="cart-item">
        <img width="100" src=${img} alt=""/>
            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${name}</p>
                        <p class="cart-item-price">$ ${price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>

                </div>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id="${id}" class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                <h3>$ ${item * search.price}</h3>

            </div>
        </div>
        `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};
generateCartItems();
//The increment function; will increase the number of items
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  update(selectedItem.id);
};
//The decrement function; will decrease the number of items
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined)
    return; //if the search is undefind then the code does nothing
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket)); //to display the objects on the LS
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  update(selectedItem.id);
};
//The update function; will update the amount of items onclick + or -
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};
//To remove an item from the shopping cart
let removeItem = (id) => {
  let selectedItem = id;
  //   console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id); //to remove the item and update the basket
  generateCartItems();
  calculation();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};
//To empty the cart
let clearCart = () => {
  basket = []; //what ever we have in the basket is gonna be removed by the ClearCart function
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
//To display the total price and update it according to the number of items selected
let TotalAmount = () => {
  if (basket.legth !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0); //we add the 0 because the statement should start from 0
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};
TotalAmount();
