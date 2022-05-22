
document.addEventListener("DOMContentLoaded", createFormEventListener);

function createFormEventListener() {
  let form = document.getElementById("register-form");
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
  let pw1 = plainFormData.pw1;
  let pw2 = plainFormData.pw2;
  let userName = plainFormData.username;
  if(userName === ""){
    alert("Username cant be empty")
  }

  else if(pw1 === pw2){
    let user = {};
    user.password = pw1;
    user.username = userName;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    };

    const response = await fetch(url, fetchOptions);
    if(response.ok){
      alert("User registered");
    }else{
      alert("Username taken");
    }

  }

}
