export class EmptyAlert {
  constructor() {
    this.alert = document.querySelector(".alert");
    this.alertClose = document.querySelector(".alert-close-btn");

    this.alertClose.onClick = this.toggleAlert.bind(this);
  }

  toggleAlert() {
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
