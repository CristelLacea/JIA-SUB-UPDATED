/* ===============================
   DATA STORAGE
================================ */
let orders = JSON.parse(localStorage.getItem("adminOrders")) || [];
let menu = JSON.parse(localStorage.getItem("adminMenu")) || [];

/* ===============================
   NAVIGATION
================================ */
function showSection(id) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    if (id === "orders") renderOrders();
    if (id === "history") renderHistory();
    if (id === "menu") renderMenu();
}

/* ===============================
   DASHBOARD STATS
================================ */
function updateStats() {
    const selectedDate = document.getElementById("salesDate")?.value;

    let sales = 0;
    let totalOrders = 0;
    let completed = 0;

    orders.forEach(order => {
        if (!selectedDate || order.date === selectedDate) {
            totalOrders++;
            if (order.status === "Completed") {
                completed++;
                sales += parseFloat(order.total);
            }
        }
    });

    document.getElementById("salesToday").textContent = sales.toFixed(2);
    document.getElementById("totalOrders").textContent = totalOrders;
    document.getElementById("completedOrders").textContent = completed;
}

function clearDate() {
    document.getElementById("salesDate").value = "";
    updateStats();
}

/* ===============================
   ORDERS MANAGEMENT
================================ */
function renderOrders() {
    const list = document.getElementById("ordersList");
    list.innerHTML = "";

    orders
        .filter(order => order.status !== "Completed")
        .forEach((order, index) => {
            list.innerHTML += `
                <div class="order-card">
                    <strong>${order.name}</strong><br>
                    Status: ${order.status}<br>
                    Total: $${order.total}
                    <br>
                    <button onclick="nextStatus(${index})">Next Status</button>
                    <button onclick="viewOrder(${index})">View</button>
                </div>
            `;
        });

    updateStats();
}

function nextStatus(index) {
    const statusFlow = ["Pending", "Preparing", "Out for Delivery", "Completed"];
    const currentIndex = statusFlow.indexOf(orders[index].status);
    if (currentIndex < statusFlow.length - 1) {
        orders[index].status = statusFlow[currentIndex + 1];
    }
    saveOrders();
}

function viewOrder(index) {
    const order = orders[index];
    document.getElementById("orderDetails").innerHTML = `
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Contact:</strong> ${order.contact}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Payment:</strong> ${order.payment}</p>
        <p><strong>Total:</strong> $${order.total}</p>
    `;
    document.getElementById("orderModal").classList.add("show");
}

function closeModal() {
    document.getElementById("orderModal").classList.remove("show");
}

/* ===============================
   ORDER HISTORY
================================ */
function renderHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    orders
        .filter(order => order.status === "Completed")
        .forEach(order => {
            list.innerHTML += `
                <div class="order-card">
                    <strong>${order.name}</strong><br>
                    Total: $${order.total}<br>
                    Payment: ${order.payment}
                </div>
            `;
        });
}

/* ===============================
   MENU MANAGEMENT
================================ */
function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const price = document.getElementById("itemPrice").value;
    const imageInput = document.getElementById("itemImage");

    if (!name || !price || !imageInput.files[0]) {
        alert("Please complete all fields.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        menu.push({
            name,
            price,
            image: reader.result,
            available: true
        });
        saveMenu();
        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";
        imageInput.value = "";
    };
    reader.readAsDataURL(imageInput.files[0]);
}

function renderMenu() {
    const list = document.getElementById("menuList");
    list.innerHTML = "";

    menu.forEach((item, index) => {
        list.innerHTML += `
            <div class="menu-card">
                <img src="${item.image}">
                <strong>${item.name}</strong>
                <p>$${item.price}</p>
                <p>Status: <span style="color:${item.available ? 'green':'red'}">${item.available ? 'Available':'Unavailable'}</span></p>
                <button onclick="toggleAvailability(${index})">${item.available ? 'Mark Unavailable' : 'Mark Available'}</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
    });
}

function toggleAvailability(index) {
    menu[index].available = !menu[index].available;
    saveMenu();
}

function deleteItem(index) {
    if (!confirm("Delete this product?")) return;
    menu.splice(index, 1);
    saveMenu();
}

/* ===============================
   STORAGE
================================ */
function saveOrders() {
    localStorage.setItem("adminOrders", JSON.stringify(orders));
    renderOrders();
    renderHistory();
    updateStats();
}

function saveMenu() {
    localStorage.setItem("adminMenu", JSON.stringify(menu));
    renderMenu();
}

/* ===============================
   CUSTOMER MENU PREVIEW
================================ */
function openPreview() {
    document.getElementById("previewModal").classList.add("show");
}

function closePreview() {
    document.getElementById("previewModal").classList.remove("show");
}

function refreshPreview() {
    const iframe = document.querySelector("#previewModal iframe");
    iframe.src = iframe.src;
}

/* ===============================
   LOGOUT
================================ */
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html"; 
    }
}

/* ===============================
   INIT
================================ */
updateStats();
renderOrders();
renderMenu();

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePreview();
    }
});
