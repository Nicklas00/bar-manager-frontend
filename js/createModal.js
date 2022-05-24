const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method = "";
const deleteButton = document.createElement("button");

function addItem() {
  setMethod("POST");
  setTitle("Add item");
  setFormDestination("http://localhost:8080/api/items");
  createInput("Item Name", "Name", "itemName", "text", "");
  createInput("Amount", "", "amountNo", "number", "");
  createDropdownInput("http://localhost:8080/api/types", "Type", "type").then(console.log);

  createFormEventListener("item");
  openModal();
}

function createUser() {
  setMethod("POST");
  setTitle("Create User");
  setFormDestination("http://localhost:8080/api/users");
  createInput("Username", "username", "username", "text", "");
  createInput("Password", "password", "pw1", "password", "");
  createInput("Password", "password", "pw2", "password", "");

  createFormEventListener("user");
  openModal();
}

function createBar() {
  setMethod("POST");
  setTitle("Create Bar");
  setFormDestination("http://localhost:8080/api/bars");
  createInput("Bar name", "bar", "bar", "text", "");

  createFormEventListener("bar");
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



async function fetchEntities(url) {
  return await fetch(url).then(response => response.json());
}

function createFormEventListener(entity) {
  form.addEventListener("submit", async event =>
    await handleFormSubmit(event, entity));
}

async function handleFormSubmit(event, entity) {
  event.preventDefault();

  form.removeEventListener("click", event);

  const formEvent = event.currentTarget;
  const url = formEvent.action;

  try {
    const formData = new FormData(formEvent);

    switch (entity) {
      case "item": {
        await postFormDataAsJson(url, formData);
        break;
      }
      case "user": {
        await postFormDataAsJsonUser(url, formData)
        break;
      }
      case "bar": {
        await postFormDataAsJsonBar(url, formData);
        break;
      }
    }


  } catch (err) {

  }
}

async function postFormDataAsJson(url, formData) {
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

  let res = await postEntity(item, url);

  if (res.ok) {
    location.reload();
  } else {
    alert("error");
  }
}

async function postFormDataAsJsonUser(url, formData) {
  let pw1 = formData.get("pw1");
  let pw2 = formData.get("pw2");
  let userName = formData.get("username");
  if(userName === ""){
    alert("Username cant be empty")
  }

  if (pw1 !== pw2) {
    alert("Passwords did not match")
  } else {
    let user = {};
    user.password = pw1;
    user.username = userName;
    const res = await postEntity(user, url);

    if(res.ok){
      alert("User registered");
      location.reload();
    }else{
      alert("Username taken");
    }
  }
}

async function postFormDataAsJsonBar(url, formData) {
  let barName = formData.get("bar");
  let bar = {};
  bar.barName = barName;

  let res = await postEntity(bar, url);

  if (res.ok) {
    await location.reload();
  } else {
     alert("Bar name already taken")
  }

}
