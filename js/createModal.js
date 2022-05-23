const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method = "";
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function addItem() {
  setMethod("POST");
  setTitle("Add item");
  setFormDestination("http://localhost:8080/api/items");
  createInput("Item Name", "Name", "itemName", "text", "");
  createInput("Amount", "", "amountNo", "number", "");
  createDropdownInput("http://localhost:8080/api/types", "Type", "type").then(console.log);

  setupSubmitButton();

  openModal();
}

function showSaleLineItems(id) {
  setTitle("Items");
  listEntities("http://localhost:8080/api/sale-line-items/sale/" + id).then(console.log);
  openModal();

}

function setTitle(title) {
  modalTitle.textContent = title;
}

function setMethod(method) {
  this.method = method;
}

function setFormDestination(action) {
  form.setAttribute("action", action);
  form.setAttribute("method", this.method);
}

function createInput(inputName, placeHolder, idName, type, value) {
  const title = document.createElement("p");
  const text = document.createTextNode(inputName);
  title.appendChild(text);

  const input = document.createElement("input");
  input.id = idName;
  input.name = idName;
  input.type = type;
  input.placeholder = placeHolder;
  input.setAttribute("required", "");
  if (value !== undefined) {
    input.value = value;
  }
  input.classList.add("js-input");


  form.appendChild(title);
  form.appendChild(input);
}

async function createDropdownInput(url, inputName, idName) {
  const title = document.createElement("p");
  const text = document.createTextNode(inputName);
  title.appendChild(text);

  const entities = await fetchEntities(url);
  const select = document.createElement("select");
  select.id = idName;
  select.name = idName;

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    select.add(new Option(entity.typeName, entity.id));
  }

  form.appendChild(title);
  form.appendChild(select);
}

async function listEntities(url) {
  let entities = await fetchEntities(url);
  entities.forEach(entity => {
    const str =   entity.item.itemName + ":     x" + entity.amountNo;
    const row = document.createElement("p");
    const text = document.createTextNode( str);
    row.style = "text-align: left"
    row.appendChild(text);
    form.appendChild(row);
  })
}

function openModal() {
  overlay.style.display = "block";
}

function closeModal() {
  overlay.style.display = "none";
  clearModal();
}

function clearModal() {
  modalTitle.textContent = "";
  deleteButton.remove();

  form.reset();

  while (modalInputField.hasChildNodes()) {
    modalInputField.removeChild(modalInputField.firstChild);
  }
}

function setupSubmitButton() {
  submitBtn.addEventListener("click", async () => {
    await createFormEventListener();
  });
}

async function fetchEntities(url) {
  return fetch(url).then(response => response.json());
}

function createFormEventListener() {
  form.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const formEvent = event.currentTarget;
  const url = formEvent.action;

  try {
    const formData = new FormData(formEvent);

    await postFormDataAsJson(url, formData);
  } catch (err) {

  }
}

async function postFormDataAsJson(url, formData) {
  let formDataJsonString;

  let select = document.getElementById("dropdownMenuButton");
  let barId  = select.options[select.selectedIndex].value;
  let amountNo = formData.get("amountNo");
  let itemName = formData.get("itemName");
  let typeId   = formData.get("type");
  let isActive = true;

  const item = {};
  item.itemName = itemName;
  item.amountNo = amountNo;
  item.bar = {};
  item.bar.id = barId;
  item.type = {};
  item.type.id = typeId;
  item.isActive = isActive;

  formDataJsonString = JSON.stringify(item);


  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJsonString
  };

  let res = await fetch(url, fetchOptions);

  if (res.ok) {
    location.reload();
  } else {
    alert("error");
  }
}
