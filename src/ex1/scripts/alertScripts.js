const emptyAlert = document.querySelector(".alert");
const alertClose = document.querySelector(".alert-close-btn");

alertClose.addEventListener("click", toggleAlert);


function toggleAlert() {
  if (emptyAlert.classList.contains("show")) {
    emptyAlert.classList.remove("show");
    emptyAlert.classList.add("hide");
  } else {
    emptyAlert.classList.add("show");
    emptyAlert.classList.remove("hide");
  }
}

function isAlertShown() {
  return emptyAlert.classList.contains("show");
}
