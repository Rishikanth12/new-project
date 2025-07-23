let cart = JSON.parse(localStorage.getItem("cart")) || [];

const tbody = document.querySelector("#cart-table tbody");
const grandTotalElem = document.getElementById("grand-total");

function renderCart() {
  tbody.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    let total = item.price * item.quantity;
    grandTotal += total;
    
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>
          <button class="decrease" data-index="${index}">−</button>
          <span id="qty-${index}">${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </td>
        <td>₹${total.toFixed(2)}</td>
        <td><button class="remove" data-index="${index}">Remove</button></td>
      `;
    tbody.appendChild(tr);
  });

  grandTotalElem.textContent = `₹${grandTotal.toFixed(2)}`;

  addEventListeners();
}

function addEventListeners() {
  // Increase quantity
  document.querySelectorAll(".increase").forEach((button) => {
    button.onclick = function () {
      let idx = +this.getAttribute("data-index");
      cart[idx].quantity++;
      saveAndRender();
    };
  });

  // Decrease quantity
  document.querySelectorAll(".decrease").forEach((button) => {
    button.onclick = function () {
      let idx = +this.getAttribute("data-index");
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        // If quantity is 1, remove the item
        cart.splice(idx, 1);
      }
      saveAndRender();
    };
  });

  // Remove item button
  document.querySelectorAll(".remove").forEach((button) => {
    button.onclick = function () {
      let idx = +this.getAttribute("data-index");
      cart.splice(idx, 1);
      saveAndRender();
    };
  });
}

function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Initial render on page load
renderCart();
