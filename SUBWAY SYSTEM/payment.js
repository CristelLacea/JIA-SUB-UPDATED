/* ============================
   PAYMENT METHOD TOGGLE
============================ */

function showCOD() {
    document.getElementById("cod-form").classList.remove("hidden");
    document.getElementById("card-form").classList.add("hidden");

    document.getElementById("codBtn").classList.add("active");
    document.getElementById("cardBtn").classList.remove("active");
}

function showCard() {
    document.getElementById("card-form").classList.remove("hidden");
    document.getElementById("cod-form").classList.add("hidden");

    document.getElementById("cardBtn").classList.add("active");
    document.getElementById("codBtn").classList.remove("active");
}

/* ============================
   LOAD ORDER SUMMARY
============================ */

const summaryContainer = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartTotal = localStorage.getItem("cartTotal") || "0.00";

if (cartItems.length === 0) {
    summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
    cartItems.forEach(item => {
        const row = document.createElement("div");
        row.className = "summary-row";

        row.innerHTML = `
            <span>${item.name}</span>
            <span>$${Number(item.price).toFixed(2)}</span>
        `;

        summaryContainer.appendChild(row);
    });
}

summaryTotal.textContent = cartTotal;

/* ============================
        SUBMIT ORDER 
============================ */
function submitOrder() {
    const codForm = document.getElementById("cod-form");
    const cardForm = document.getElementById("card-form");

    const activeForm = codForm.classList.contains("hidden")
        ? cardForm
        : codForm;

    if (!activeForm.checkValidity()) {
        activeForm.reportValidity();
        return;
    }

    // Get tip
    if (customTipInput && !customTipInput.classList.contains("hidden")) {
        const val = parseFloat(customTipInput.value);
        selectedTip = isNaN(val) ? 0 : val;
    }

    // Total with tip
    let totalWithTip = parseFloat(localStorage.getItem("cartTotal") || 0) + selectedTip;
    totalWithTip = totalWithTip.toFixed(2);

    // Show modal
    const modal = document.getElementById("successModal");
    modal.querySelector("p").textContent = `Thank you for ordering from JIA Subs! Total paid: $${totalWithTip}`;
    modal.classList.add("show");

    // Clear cart
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotal");
}


// TIP LOGIC
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("customTip");
let selectedTip = 0;

tipButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active from all buttons
        tipButtons.forEach(b => b.classList.remove("active"));

        // Set clicked button active
        btn.classList.add("active");

        if (btn.dataset.value === "custom") {
            customTipInput.classList.remove("hidden");
            customTipInput.focus();
            selectedTip = 0; // wait for user input
        } else {
            customTipInput.classList.add("hidden");
            customTipInput.value = "";
            selectedTip = parseFloat(btn.dataset.value);
        }
    });
});

function closeModal() {
    const modal = document.getElementById("successModal");
    modal.classList.remove("show");

    // Redirect back to menu after closing
    window.location.href = "menu.html";
}

