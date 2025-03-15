const pswdBtn = document.querySelector("#shw-password");
pswdBtn.addEventListener("click", function () {
  const pswdInput = document.getElementById("password");
  const type = pswdInput.getAttribute("type");
  if (type == "password") {
    pswdInput.setAttribute("type", "text");
    pswdBtn.innerHTML = "Hide password";
  } else {
    pswdInput.setAttribute("type", "password");
    pswdBtn.innerHTML = "Show password";
  }
});
