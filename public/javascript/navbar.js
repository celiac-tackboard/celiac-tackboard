function profileRedirect() {
  document.location.replace("/profile");
}

function homeRedirect() {
  document.location.replace("/");
}

document.querySelector("#home").addEventListener("click", homeRedirect);
document.querySelector("#profile").addEventListener("click", profileRedirect);
