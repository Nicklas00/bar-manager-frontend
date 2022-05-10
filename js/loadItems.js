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
                  "<td><button class='btn btn-outline-danger' id='delete-btn' onclick='deleteById(" + items[i].id + ")'>Delete </button></td>"
                "</tr>";
      table.innerHTML += row;
    }
  });
}

async function deleteById(id){
  const url = "http://localhost:8080/api/items/" + id
  const fetchOptions = {
    method: "delete",
    headers:{
      "content-Type": "application/json",
    },
  };
  location.reload();
  return fetch(url, fetchOptions);

}

/*function updateItems(){
  let colCount = 3
  cell = row.insertCell(colCount);
  const pbUpdate = document.createElement("input");
  pbUpdate.type = "button";
  pbUpdate.setAttribute('value', 'Opdate storage');
  pbUpdate.onclick = function () {
    updateRow(amount_no, , rowCount, row, inp, length, description, releasedate, imagelink);
  }
  cell.appendChild(pbUpdate);

}

 */





