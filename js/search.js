async function itemSearch(tableType) {
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
      await loadStoragePage(url);
      break;
    case 1:
      await loadCreateSalePage(url);
      break;
  }
}

async function saleSearch() {
  let input = document.getElementById("search").value;
  let barId = JSON.parse(localStorage.getItem("barId"));
  let url = "http://localhost:8080/api/sales?barId=" + barId + "&date=" + input;
  await loadSalePage(url);
}

async function expenseSearch() {
  let input = document.getElementById("search").value;
  let barId = JSON.parse(localStorage.getItem("barId"));
  let url = "http://localhost:8080/api/expenses?barId=" + barId + "&date=" + input;
  await loadExpensesPage(url);
}
