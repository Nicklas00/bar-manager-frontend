const barUrl = "http://localhost:8080/api/bars";

async function loadBars(){
  const DD = document.getElementById("dropdownMenuButton");

  await fetch(barUrl).then(res => res.json()).then(bars => {
    for (let i = 0; i < bars.length; i++){
      DD. add(new Option(bars[i].barName, bars[i].id))
    }

  });
}
loadBars();







