function checkLogin() {
  let sessionUserId = JSON.parse(sessionStorage.getItem("userId"));
  if (sessionUserId === null) {
    window.location.href = "index.html";
  }
}

checkLogin();
