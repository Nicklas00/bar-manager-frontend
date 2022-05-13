const url = "http://localhost:8080/api/items/bar/";
const itemsUrl = "http://localhost:8080/api/items";
const saleUrl = "http://localhost:8080/api/sales";
const saleLineUrl = "http://localhost:8080/api/sale-line-items"

async function getItems(url) {
  return await fetch(url).then(res => res.json());
}

async function loadItems(url){
  let items = await getItems(url);

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

async function loadItemsSale(url){
  let items = await getItems(url);

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

function updateInput(input, i){
  let id = "test" + i;
  document.getElementById(id).setAttribute('value', input);
}

async function loadItems2(id) {
  localStorage.setItem("barId", JSON.stringify(id));
  await loadItems(url + id);
}

async function loadItems3(id) {
  localStorage.setItem("barId", JSON.stringify(id));
  await loadItemsSale(url + id);
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
      await loadItems(url);
      break;
    case 1:
      await loadItemsSale(url);
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
  let price = document.getElementById("total-price").value;
  let date = new Date();

  // create sale object to send to db
  let sale = {};
  sale.totalPrice = price;
  sale.saleDate = date;

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
