const url = "http://localhost:8080/api/sales/bar/";



async function loadSales(id){

  const table = document.getElementById("myTable");

  // Remove all elements inside table
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }

  await fetch(url + id).then(res => res.json()).then(sales => {
    for (let i = 0; i < sales.length; i++){
      let row = "<tr>" +
        "<td>" + sales[i].saleDate + "</td>" +
        "<td><input value='" + sales[i].totalPrice + "'/></td>" +
        "<td><button class='btn btn-outline-danger' id='delete-btn' onclick='deleteById(" + sales[i].id + ")'>Delete </button></td>"
      "</tr>";
      table.innerHTML += row;
    }
  });
}

async function deleteById(id){
  const url = "http://localhost:8080/api/sales/" + id
  const fetchOptions = {
    method: "delete",
    headers:{
      "content-Type": "application/json",
    },
  };
  location.reload();
  return await fetch(url, fetchOptions);

}







