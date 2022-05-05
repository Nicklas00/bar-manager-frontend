const url = "http://localhost:8080/api/item/bar/";

async function loadItems(id){
  const table = document.querySelector(".item-table");

  await fetch(url + id).then(res => res.json()).then(items => {
    for (let i = 0; i < items.length; i++){
      let row = document.createElement("tr");
      let col = document.createElement("td");
      col.innerText = "hej";
      row.appendChild(col);
      table.appendChild(row);
    }

  });
}
loadItems(1);
