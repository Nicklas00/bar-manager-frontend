const url = "http://localhost:8080/api/item/bar/";

async function loadItems(id){
  const table = document.getElementById("myTable");

  await fetch(url + id).then(res => res.json()).then(items => {
    for (let i = 0; i < items.length; i++){
      let row = "<tr>" +
                  "<td>" + items[i].itemName + "</td>" +
                  "<td>" + items[i].price + "</td>" +
                  "<td><input value='" + items[i].amountNo + "'/></td>" +
                "</tr>";
      table.innerHTML += row;
    }

  });
}
loadItems(1);
