const barUrl = "http://localhost:8080/api/bars";
const typeUrl = "http://localhost:8080/api/types"
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
  });
}
async function loadTypes (){
  const DD = document.getElementById("dropdown-type");


  await fetch(typeUrl).then(res => res.json()).then(types => {
    for (let i = 0; i < types.length; i++){
      DD.add(new Option(types[i].typeName, types[i].id))
    }

  });
}
loadBars().then(console.log);
loadTypes().then(console.log);







