async function getEntities(url) {
  return await fetch(url).then(res => res.json());
}

async function postEntity(entity, url) {
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entity)
  };
  return await fetch(url, fetchOptions);
}

async function updateEntity(entity, url) {
  let fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entity)
  };
  return await fetch(url, fetchOptions);
}
async function updateActive(url) {
  let fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetch(url, fetchOptions);
}

function deleteEntity(url) {
  const fetchOptions = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, fetchOptions);
}

async function createExpense(){
  const expenseUrl = "http://localhost:8080/api/expenses"
  let weekDate = document.getElementById("week-date").value;
  let incoExpense = Number(document.getElementById("inco").value);
  let tuborgExpense = Number(document.getElementById("tuborg").value);
  let totalExpense = incoExpense + tuborgExpense;
  let barId = JSON.parse(localStorage.getItem("barId"));
  let expense = {};

  expense.bar = {};
  expense.bar.id = barId;
  expense.expenseDateStr = weekDate;
  expense.incoTotal = incoExpense;
  expense.tuborgTotal = tuborgExpense;
  expense.totalExpense = totalExpense;

  await postEntity(expense, expenseUrl);
  await refreshPage("Expense created");
}
