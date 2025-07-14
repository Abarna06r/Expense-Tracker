let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateBalance() {
  const balance = transactions.reduce((acc, t) => {
    return acc + (t.type === "income" ? t.amount : -t.amount);
  }, 0);
  document.getElementById("balance").textContent = balance.toFixed(2);
}

function renderTransactions() {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  transactions.forEach((t, index) => {
    const item = document.createElement("li");
    item.className = `transaction ${t.type}`;
    item.innerHTML = `
      <span>${t.name}</span>
      <span>₹${t.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${index})" style="margin-left: 10px; color: red; background: none; border: none; cursor: pointer;">✖</button>
    `;
    list.appendChild(item);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  updateBalance();
}

document.getElementById("transactionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.querySelector('input[name="type"]:checked').value;
  const error = document.getElementById("error");

  if (!name || isNaN(amount) || amount <= 0) {
    error.textContent = "Please enter valid name and positive amount.";
    return;
  }

  error.textContent = "";

  transactions.push({ name, amount, type });
  saveAndRender();

  this.reset();
});

saveAndRender();
