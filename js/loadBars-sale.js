const barUrl = "http://localhost:8080/api/bars";

async function loadBars(){
  const DD1 = document.getElementById("dropdownMenuButton");

  await fetch(barUrl).then(res => res.json()).then(bars => {
    for (let i = 0; i < bars.length; i++){
      DD1. add(new Option(bars[i].barName, bars[i].id))
    }

  });

  let select = document.getElementById("dropdownMenuButton");
  let id = select.options[select.selectedIndex].value;
  await loadSales(id);

}
loadBars();








