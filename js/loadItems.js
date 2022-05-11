const url = "http://localhost:8080/api/items/bar/";

async function loadItems(id){


  localStorage.setItem("barId", JSON.stringify(id));

  const table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  await fetch(url + id).then(res => res.json()).then(items => {
    for (let i = 0; i < items.length; i++){
      let row = "<tr>" +
                  "<td>" + items[i].itemName + "</td>" +
                  "<td>" + items[i].type.typeName + "</td>" +
                  "<td><input value='" + items[i].amountNo + "'/></td>" +
                  "<td><button class='btn btn-outline-danger' id='delete-btn' onclick='deleteById(" + items[i].id + ")'>Delete</button></td>"
                "</tr>";
      table.innerHTML += row;
    }
  });
}

async function deleteById(id){
  const url = "http://localhost:8080/api/items/" + id;
  await deleteEntity(url);
  location.reload();
}

async function search() {
  const input = document.getElementById("search")
  const url = "http://localhost:8080/api/items" + "?keyword=" + input.value;
  let res = await fetch(url).then(j => j.json()).then(alert);

}







