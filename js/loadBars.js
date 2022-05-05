const url = "http://localhost:8080/api/bar";

async function fetchBars(){
  const bars = await fetch(url).then(res => res.json())
  return bars;
}

let bars = fetchBars();
for (let i = 0; i < bars.length; i++){
  alert(bars[i].barName);
}
