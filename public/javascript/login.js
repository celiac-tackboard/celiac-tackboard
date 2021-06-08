function loginRedirect() {
  document.location.replace("/login");
}

document.querySelector("#login").addEventListener("click", loginRedirect);
