export class Alert {
  constructor(htmlElement) {
    this.alert = htmlElement.querySelector(".alert");
    this.alertClose = htmlElement.querySelector(".alert-close-btn");
    this.alertMessage = htmlElement.getElementById("alert-message");

    this.alertClose.onclick = this.toggleAlert.bind(this);
  }

  toggleAlert(alertContent = this.alertMessage.innerText) {
    this.alertMessage.innerText = alertContent;
    if (this.alert.classList.contains("show")) {
      this.alert.classList.remove("show");
      this.alert.classList.add("hide");
    } else {
      this.alert.classList.add("show");
      this.alert.classList.remove("hide");
    }
  }

  isAlertShown() {
    return this.alert.classList.contains("show");
  }
}
