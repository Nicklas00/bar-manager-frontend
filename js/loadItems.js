const url = "http://localhost:8080/api/items/bar/";

async function getItems(url) {
  return await fetch(url).then(res => res.json());
}
async function loadItems(url){
  let items = await getItems(url);

  const table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  for (let i = 0; i < items.length; i++){
    let row = "<tr>" +
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

  const table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  for (let i = 0; i < items.length; i++){
    let row = "<tr>" +
      "<td>" + items[i].itemName + "</td>" +
      "<td>" + items[i].type.typeName + "</td>" +
      "<td>" + items[i].amountNo + "</td>" +
      "<td><input type='number' min='0' max='"+ items[i].amountNo + "'> </td>"
    "</tr>";
    table.innerHTML += row;
  }
}

function updateInput(input, i){
  let id = "test" + i;
  document.getElementById(id).setAttribute('value',input);
}

function loadItems2(id){
  localStorage.setItem("barId", JSON.stringify(id));
  loadItems(url + id);
}
function loadItems3(id){
  localStorage.setItem("barId", JSON.stringify(id));
  loadItemsSale(url + id);
}

async function deleteById(id){
  const url = "http://localhost:8080/api/items/" + id;
  await deleteEntity(url);
  location.reload();
}

async function search() {
  const input = document.getElementById("search")
  let select = document.getElementById("dropdown-type");
  let typeId  = select.options[select.selectedIndex].value;
  let barId = JSON.parse(localStorage.getItem("barId"));
  let url;
  if (isEmpty(input.value) && typeId==0){
    url= "http://localhost:8080/api/items/bar/" + barId;
  }
  else if (!isEmpty(input.value) && typeId==0){
    url = "http://localhost:8080/api/items" + "?keyword=" + input.value + "&barId=" + barId
  }
  else if (isEmpty(input.value) && !typeId==0){
    url = "http://localhost:8080/api/items" + "?barId=" + barId + "&typeId=" + typeId;
  }
  else {
    url = "http://localhost:8080/api/items" + "?keyword=" + input.value + "&barId=" + barId + "&typeId=" + typeId;
  }

  loadItems(url);
}
function isEmpty (str){
  return !str.trim().length;
}

async function updateItems() {
  const putUrl = "http://localhost:8080/api/items";

  let items = JSON.parse(localStorage.getItem("items"));

  let table = document.getElementById("myTable");
  for (let i in table.rows) {
    let row = table.rows[i];
    let oldVal = items[i].amountNo;
    let newVal = row.cells[2].children[0].value

    if (oldVal != newVal) {
      items[i].amountNo = newVal;
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items[i])
      };
      await fetch(putUrl, fetchOptions);
    }
  }
}

async function createSale() {
  const putUrl = "http://localhost:8080/api/items";

  const saleUrl = "http://localhost:8080/api/sales"

  let price = document.getElementById("total-price").value;
  let date = new Date();

  let sale = {};

  sale.totalPrice = price;
  sale.saleDate = date;
  //alert(JSON.stringify(sale));

  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sale)
  };

  await fetch(saleUrl, fetchOptions);

  let items = JSON.parse(localStorage.getItem("items"));

  let table = document.getElementById("myTable");
  for (let i in table.rows) {
    let row = table.rows[i];
    let amount = row.cells[3].children[0].value

    if (amount > 0) {
      items[i].amountNo = items[i].amountNo - amount;
      fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items[i])
      };
      await fetch(putUrl, fetchOptions);
    }
    localStorage.setItem("items", JSON.stringify(items));
  }

}







