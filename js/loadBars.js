const barUrl = "http://localhost:8080/api/bars";
let index = 0;

async function loadBars(){
  const DD = document.getElementById("dropdownMenuButton");
  let barId = JSON.parse(window.localStorage.getItem("barId"));


  await fetch(barUrl).then(res => res.json()).then(bars => {
    for (let i = 0; i < bars.length; i++){
      if (bars[i].id == barId) {
        index = i;
      }

      DD.add(new Option(bars[i].barName, bars[i].id))
    }

    DD.selectedIndex = index;
    loadItems(JSON.parse(barId));
  });
}
loadBars().then(console.log);








