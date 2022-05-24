
document.addEventListener("DOMContentLoaded", createFormEventListener);

function createFormEventListener() {
  let form = document.getElementById("login-form");
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
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJsonString
  };

  const response = await fetch(url, fetchOptions);
  const user = await response.json();

  if (response.ok) {
    sessionStorage.setItem("userId", user.id);
    window.location.href = "storage-page.html";
  } else {
    alert("Username or password incorrect");
  }

}
