const saleUrl = "http://localhost:8080/api/sales";

loadSales(saleUrl);

async function loadSales(url){
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

      "<tr>" +
      "<td>" + dateStr + "</td>" +
      "<td>" + sales[i].revenue + "</td>" +
    "</tr>";

    table.innerHTML += row;
  }

  /* localStorage.setItem("items", JSON.stringify(items)); */
}
