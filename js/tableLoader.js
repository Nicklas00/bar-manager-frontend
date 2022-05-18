const url = "http://localhost:8080/api/items/bar/";
const itemsUrl = "http://localhost:8080/api/items";
const saleUrl = "http://localhost:8080/api/sales";
const saleBarUrl = "http://localhost:8080/api/sales/bar/";
const saleLineUrl = "http://localhost:8080/api/sale-line-items";
const expensesBarUrl = "http://localhost:8080/api/expenses/bar/";

async function loadStoragePage(url){
  let items = await getEntities(url);

  let table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  for (let i = 0; i < items.length; i++){
    let row =

    "<tr>" +
      "<td>" + items[i].itemName + "</td>" +
      "<td>" + items[i].type.typeName + "</td>" +
      "<td><input value='" + items[i].amountNo + "' onchange='updateInput(this.value, "+i+")' id='test"+i+"'/></td>" +
      "<td><button class='btn btn-outline-danger' id='delete-btn' onclick='deleteById(" + items[i].id + ")'>Delete</button></td>"
    "</tr>";

    table.innerHTML += row;
  }
  localStorage.setItem("items", JSON.stringify(items));
}

async function loadCreateSalePage(url){
  let items = await getEntities(url);

  let table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  for (let i = 0; i < items.length; i++){
    let row =

    "<tr>" +
      "<td>" + items[i].itemName + "</td>" +
      "<td>" + items[i].type.typeName + "</td>" +
      "<td>" + items[i].amountNo + "</td>" +
      "<td><input type='number' min='0' max='"+ items[i].amountNo + "'> </td>"
    "</tr>";

    table.innerHTML += row;
  }

  localStorage.setItem("items", JSON.stringify(items));
}

async function loadSalePage(url){
  let sales = await getEntities(url);

  let table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  for (let i = 0; i < sales.length; i++){
    let date = new Date(sales[i].saleDate);
    let dateStr = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
    //sales[i].saleDateStr = "y =" + sales[i].saleDate.substr(0,4);

    let row =

      "<tr onclick='showSaleLineItems(" + sales[i].id + ")'>" +
      "<td>" + dateStr + "</td>" +
      "<td>" + sales[i].revenue + "</td>" +
      "</tr>";

    table.innerHTML += row;
  }

  /* localStorage.setItem("items", JSON.stringify(items)); */
}
async function loadExpensesPage(url){
  let expenses = await getEntities(url);

  let table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  for (let i = 0; i < expenses.length; i++){
    let row =

      "<tr >" +
      "<td>" + expenses[i].expenseDateStr + "</td>" +
      "<td>" + expenses[i].incoTotal + "</td>" +
      "<td>" + expenses[i].tuborgTotal + "</td>" +
      "<td>" + expenses[i].totalExpense + "</td>" +
      "</tr>";

    table.innerHTML += row;
  }
}

function updateInput(input, i){
  let id = "test" + i;
  document.getElementById(id).setAttribute('value', input);
}

async function loadExpensesPageById(id) {
  localStorage.setItem("barId", JSON.stringify(id));
  await loadExpensesPage(expensesBarUrl + id);
}

async function loadStoragePageById(id) {
  localStorage.setItem("barId", JSON.stringify(id));
  await loadStoragePage(url + id);
}

async function loadCreateSalePageById(id) {
  localStorage.setItem("barId", JSON.stringify(id));
  await loadCreateSalePage(url + id);
}

async function loadSalesPageById(id) {
  localStorage.setItem("barId", JSON.stringify(id));
  await loadSalePage(saleBarUrl + id);
}

async function deleteById(id){
  await deleteEntity(itemsUrl + "/" + id);
  location.reload();
}

async function search(tableType) {
  let input = document.getElementById("search")
  let select = document.getElementById("dropdown-type");
  let typeId  = select.options[select.selectedIndex].value;
  let barId = JSON.parse(localStorage.getItem("barId"));
  let url;

  if (isEmpty(input.value) && typeId == 0){
    url= "http://localhost:8080/api/items/bar/" + barId;
  }
  else if (!isEmpty(input.value) && typeId == 0){
    url = "http://localhost:8080/api/items" + "?keyword=" + input.value + "&barId=" + barId
  }
  else if (isEmpty(input.value) && !typeId == 0){
    url = "http://localhost:8080/api/items" + "?barId=" + barId + "&typeId=" + typeId;
  }
  else {
    url = "http://localhost:8080/api/items" + "?keyword=" + input.value + "&barId=" + barId + "&typeId=" + typeId;
  }

  switch (tableType) {
    case 0:
      await loadStoragePage(url);
      break;
    case 1:
      await loadCreateSalePage(url);
      break;
  }

}

function isEmpty (str){
  return !str.trim().length;
}

async function updateItems() {
  let items = JSON.parse(localStorage.getItem("items"));
  let table = document.getElementById("myTable");

  for (let i in table.rows) {
    let row = table.rows[i];
    let oldVal = items[i].amountNo;
    let newVal = row.cells[2].children[0].value

    if (oldVal != newVal) {
      items[i].amountNo = newVal;
      await updateEntity(items[i], itemsUrl);
    }
  }
}

async function createSale() {
  let revenue = document.getElementById("revenue-total").value;
  let date = document.getElementById("sale-date").value;

  // create sale object to send to db
  let sale = {};
  sale.revenue = revenue;
  sale.saleDate = date;
  sale.bar = {};
  sale.bar.id = JSON.parse(localStorage.getItem("barId"));

  // save sale in db. returns the saved sale, which we need for the salelineitem
  let response = await postEntity(sale, saleUrl);
  let savedSale = await response.json();

  let items = JSON.parse(localStorage.getItem("items"));
  let table = document.getElementById("myTable");

  for (let i in table.rows) {
    let row = table.rows[i];
    let amount = row.cells[3].children[0].value;

    if (amount > 0) {

      // create/save salelineitem (using the saved sale)
      let saleLineItem = {};
      saleLineItem.amountNo = amount;
      saleLineItem.item = items[i];
      saleLineItem.sale = savedSale;
      await postEntity(saleLineItem, saleLineUrl);

      // subtract amount from item amount, and update the item
      items[i].amountNo = items[i].amountNo - amount;
      await updateEntity(items[i], itemsUrl);
    }
    localStorage.setItem("items", JSON.stringify(items));
  }
}

