import { setRouter } from "../router/router.js";

setRouter();

const backendURL = "http://alluc.test";

function showAlert(type, message) {
  const alertDiv = document.querySelector(`.alert.alert-${type}`);
  if (alertDiv) {
    alertDiv.classList.remove("d-none");
    alertDiv.textContent = message;

    setTimeout(() => {
      alertDiv.classList.add("d-none");
    }, 3000);
  }
}

export { backendURL, showAlert, setRouter };
