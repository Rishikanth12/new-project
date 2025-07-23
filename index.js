// SIDEBAR MENU JS
function showSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "flex";
}
function HideSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "none";
}

// CART AND BUTTON LOGIC
let cartcount = 0;
const addButtons = document.querySelectorAll(".order");
const cartDisplay = document.querySelector(".cartcount");

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    cartcount++;
    cartDisplay.textContent = cartcount;
  });
});

document.querySelectorAll(".order").forEach(function (button) {
  button.addEventListener("click", function () {
    let name = this.getAttribute('item-name');
    let price = parseFloat(this.getAttribute('item-price'));
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  let existingItem = cart.find(item => item.name === name); 

  if(existingItem){
    existingItem.quantity += 1;
  }else{
    cart.push({name: name, price: price, quantity: 1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
   });
});
localStorage.clear();

