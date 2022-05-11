const overlay1 = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle1 = document.querySelector(".modal-title");
let modalInputField1 = document.querySelector(".modal-input-field");

let form1 = document.querySelector(".modal-input-field");

let method1 = "";
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function addSale() {
  setMethod("post");
 /* setTitle("Add Sale");
  setFormDestination("http://localhost:8080/api/sales", "post");
  createInput("Date", "Date", "saleDate", "date", "");
  createInput("Sale Number", "Revenue", "totalPrice", "number", "");
*/
  setupSubmitButton1();

  openModal();
}

function setTitle(title1) {
  modalTitle1.textContent = title1;
}

function setMethod(method1) {
  this.method = method1;
}

function setFormDestination(action, method) {
  form1.setAttribute("action", action);
  form1.setAttribute("method", method);
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
  if (value !== undefined) {
    input.value = value;
  }
  input.classList.add("js-input");


  form1.appendChild(title);
  form1.appendChild(input);
}

async function createDropdownInput(url, inputName, idName) {
  const title1 = document.createElement("p");
  const text1 = document.createTextNode(inputName);
  title1.appendChild(text);

  const entities1 = await fetchEntities(url);
  const select1 = document.createElement("select");
  select1.id = idName;
  select1.name = idName;

  for (let i = 0; i < entities1.length; i++) {
    let entity = entities1[i];
    select1.add(new Option(entity1.typeName, entity.id));
  }

  form1.appendChild(title1);
  form1.appendChild(select);

}


function openModal() {
  overlay1.style.display = "block";
}

function closeModal() {
  overlay1.style.display = "none";
  clearModal();
}

function clearModal() {
  modalTitle1.textContent = "";
  deleteButton.remove();


  form1.reset();

  while (modalInputField1.hasChildNodes()) {
    modalInputField1.removeChild(modalInputField1.firstChild);
  }
}

function createDeleteButton1(url) {
  const modalFooter = document.querySelector(".modal-footer")

  deleteButton.id = "delete";
  deleteButton.className = "btn btn-danger remove";
  deleteButton.textContent = "Delete";

  modalFooter.appendChild(deleteButton);

  deleteButton.addEventListener("click", async () => {

    await deleteEntity(url);
    await location.reload();
  });
}

function setupSubmitButton1() {
  submitBtn.addEventListener("click", async () => {
    await createFormEventListener();
    await location.reload();
  });
}

function deleteEntity(url) {
  const fetchOptions = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, fetchOptions);
}

async function fetchEntities(url) {
  return fetch(url).then(response => response.json());
}

function createFormEventListener() {

  form1.addEventListener("submit", handleFormSubmit);
  //alert(form.getAttribute("movie"));
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
  let barId = select.options[select.selectedIndex].value;
  let amountNo = document.getElementById("totalPrice").value;
  let itemName = document.getElementById("SaleDate").value;

  const sale = {};
  sale.saleDate = saleDate;
  sale.totalPrice = totalPrice;
  item.bar = {};
  item.bar.id = barId;


  formDataJsonString = JSON.stringify(sale);



  alert(formDataJsonString);
  alert(method1);

  const fetchOptions = {
    method: this.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJsonString
  };

  const response = await fetch(url, fetchOptions);

  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
