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
                  "<td><input value='" + items[i].amountNo + "'/></td>" +
                  "<td><button class='btn btn-outline-danger' id='delete-btn' onclick='deleteById(" + items[i].id + ")'>Delete</button></td>"
                "</tr>";
      table.innerHTML += row;
  }
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
      "<td><input type='number'> </td>" +
      "<td><button class='btn btn-outline-danger' id='delete-btn' onclick='deleteById(" + items[i].id + ")'>Delete</button></td>"
    "</tr>";
    table.innerHTML += row;
  }
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







