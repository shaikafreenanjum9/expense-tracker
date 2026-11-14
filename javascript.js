// Expense Tracker JavaScript

// Selecting HTML Elements
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total-amount");
const countDisplay = document.getElementById("expense-count");

// Load expenses from Local Storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to display expenses
function displayExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const item = document.createElement("li");
        item.classList.add("expense-item");

        item.innerHTML = `
            <div>
                <h3>${expense.name}</h3>
                <p>${expense.category}</p>
                <small>${expense.date}</small>
            </div>

            <div>
                <strong>₹${expense.amount.toFixed(2)}</strong>
                <button class="delete-btn" data-index="${index}">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(item);
    });

    // Update total and expense count
    totalDisplay.textContent = "₹" + total.toFixed(2);
    countDisplay.textContent = expenses.length;

    // Save data
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to add expense
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    if (!name || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter valid expense details!");
        return;
    }

    const expense = {
        name: name,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    };

    expenses.push(expense);

    displayExpenses();

    form.reset();
});

// Function to delete expense
expenseList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const index = Number(event.target.dataset.index);

        expenses.splice(index, 1);

        displayExpenses();
    }
});

// Display expenses when page loads
displayExpenses();