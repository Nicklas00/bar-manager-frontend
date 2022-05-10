const url = "http://localhost:8080/api/items/bar/";

async function loadItems(id){

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
                "</tr>";
      table.innerHTML += row;
    }
  });
}





