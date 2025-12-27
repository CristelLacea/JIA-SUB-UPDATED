
/*MENU PANEL*/

let selectedItem = {};
let cartTotal = 0;

function openAddonPanel(img) {
  const card = img.closest(".menu-card");

  selectedItem = {
    name: card.dataset.name,
    price: parseFloat(card.dataset.price),
    addons: card.dataset.addons.split(",")
  };

  document.getElementById("addonTitle").textContent = selectedItem.name;

  const box = document.getElementById("addonOptions");
  box.innerHTML = "";

  selectedItem.addons.forEach(a => {
    const [name, price] = a.split(":");
    box.innerHTML += `
      <label>
        <input type="checkbox" data-price="${price}" onchange="updateAddonTotal()">
        ${name} (+$${price})
      </label>
    `;
  });

  updateAddonTotal();
  document.getElementById("addonPanel").style.bottom = "0";
}

function updateAddonTotal() {
  let total = selectedItem.price;

  document.querySelectorAll("#addonOptions input:checked").forEach(cb => {
    total += parseFloat(cb.dataset.price);
  });

  document.getElementById("addonTotal").textContent = total.toFixed(2);
}

function addToCart() {
  const cart = document.getElementById("cartItems");
  const price = parseFloat(document.getElementById("addonTotal").textContent);

  cart.innerHTML += `
    <div class="cart-item">
      <span>${selectedItem.name}</span>
      <span>$${price.toFixed(2)}</span>
    </div>
  `;

  cartTotal += price;
  document.getElementById("cartTotal").textContent = cartTotal.toFixed(2);

  document.getElementById("addonPanel").style.bottom = "-320px";
}

// Open panel
function openAddonPanel(img) {
  const card = img.parentElement;
  
  selectedItem.name = card.dataset.name;
  selectedItem.price = parseFloat(card.dataset.price);

  document.getElementById("addonTitle").textContent = selectedItem.name;

  const addons = card.dataset.addons.split(",");
  const box = document.getElementById("addonOptions");
  box.innerHTML = "";

  addons.forEach(addon => {
    const [name, price] = addon.split(":");
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" data-price="${price}">
      ${name} (+$${price})
    `;
    box.appendChild(label);
  });

  document.getElementById("addonTotal").textContent = selectedItem.price.toFixed(2);

  // Show panel
  document.getElementById("addonPanel").classList.add("active");
}

// Close panel
document.getElementById("closeAddonPanel").addEventListener("click", () => {
  document.getElementById("addonPanel").classList.remove("active");
});
let cart = [];

// Add item to cart
function addToCart() {
  const addonCheckboxes = document.querySelectorAll("#addonOptions input");
  let addonTotal = 0;
  let addonsSelected = [];

  addonCheckboxes.forEach(box => {
    if (box.checked) {
      addonTotal += parseFloat(box.dataset.price);
      addonsSelected.push(box.parentElement.textContent.trim());
    }
  });

  const finalPrice = selectedItem.price + addonTotal;

  // Check if item already exists
  const existing = cart.find(item => item.name === selectedItem.name && JSON.stringify(item.addons) === JSON.stringify(addonsSelected));

  if (existing) {
    existing.qty += 1;
    existing.total = (existing.qty * finalPrice).toFixed(2);
  } else {
    cart.push({
      name: selectedItem.name,
      price: selectedItem.price,
      addons: addonsSelected,
      qty: 1,
      total: finalPrice.toFixed(2)
    });
  }

  updateCart();
  closeAddonPanel();
}

// Update Cart Display
function updateCart() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.total);

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        ${item.addons.length > 0 ? `<small>${item.addons.join(", ")}</small>` : ""}
      </div>
      <div>
        <button onclick="changeQty(${index}, -1)">-</button>
        <span class="quantity">${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
      <div>$${item.total}</div>
    `;
    cartContainer.appendChild(div);
  });

  document.getElementById("cartTotal").textContent = total.toFixed(2);
}

// Change quantity
function changeQty(index, delta) {
  cart[index].qty += delta;
  
  if (cart[index].qty <= 0) {
    cart.splice(index, 1); // Remove if 0
  } else {
    const basePrice = cart[index].price;
    const addonsPrice = cart[index].addons.reduce((sum, addon) => {
      const match = addon.match(/\+\$(\d+(\.\d+)?)/);
      return sum + (match ? parseFloat(match[1]) : 0);
    }, 0);

    cart[index].total = ((basePrice + addonsPrice) * cart[index].qty).toFixed(2);
  }

  updateCart();
}

// Close panel
function closeAddonPanel() {
  document.getElementById("addonPanel").classList.remove("active");
}
function openAddonPanel(img) {
  const card = img.parentElement;

  selectedItem.name = card.dataset.name;
  selectedItem.price = parseFloat(card.dataset.price);

  document.getElementById("addonTitle").textContent = selectedItem.name;

  const addons = card.dataset.addons.split(",");
  const box = document.getElementById("addonOptions");
  box.innerHTML = "";

  addons.forEach(addon => {
    const [name, price] = addon.split(":");
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" data-price="${price}">
      ${name} (+$${price})
    `;
    box.appendChild(label);
  });

  // Initial total
  updateAddonTotal();

  // Add event listeners for live updating
  const addonCheckboxes = document.querySelectorAll("#addonOptions input");
  addonCheckboxes.forEach(box => {
    box.addEventListener("change", updateAddonTotal);
  });

  // Show panel
  document.getElementById("addonPanel").classList.add("active");
}

// Update the add-on total dynamically
function updateAddonTotal() {
  const addonCheckboxes = document.querySelectorAll("#addonOptions input");
  let addonTotal = 0;

  addonCheckboxes.forEach(box => {
    if (box.checked) {
      addonTotal += parseFloat(box.dataset.price);
    }
  });

  const total = selectedItem.price + addonTotal;
  document.getElementById("addonTotal").textContent = total.toFixed(2);
}

// Close panel
document.getElementById("closeAddonPanel").addEventListener("click", () => {
  document.getElementById("addonPanel").classList.remove("active");
});


document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".categories button");
  const menuCards = document.querySelectorAll(".menu-card");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active from all buttons
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.textContent;

      menuCards.forEach(card => {
        if (category === "All" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

function goToCheckout() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("cartTotal", cartTotal.toFixed(2));
    window.location.href = "payment.html";
}



function toggleUserPanel() {
    const panel = document.getElementById('userPanel');
    const overlay = document.getElementById('panelOverlay');
    const nameDisplay = document.getElementById('panelUserName');

    // Update name in panel from storage
    const savedName = localStorage.getItem('UserName');
    if (savedName) {
        nameDisplay.innerText = savedName;
    }

    // Toggle classes
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
}

function logout() {
    // Clear the storage trapping
    localStorage.removeItem('UserName');
    window.location.href = "index.html";
}