import { backendURL, showAlert, setRouter } from "../utils/utils.js";
setRouter();

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("admin_login")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var email = event.target.querySelector('input[type="email"]').value;
      var password = event.target.querySelector('input[type="password"]').value;

      fetch(backendURL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .then(function (responseJson) {
          if (
            responseJson.admin &&
            responseJson.admin.email === "admin@alluc.com"
          ) {
            showAlert("success", "Login successful!");
            localStorage.setItem("admin_token", responseJson.admin_token);
            event.target.reset();
            setTimeout(function () {
              window.location.href = "/admin/index.html";
            }, 2000); // Delay of 2 seconds
          } else {
            showAlert("danger", "You are not an admin");
            event.target.reset();
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
          showAlert("danger", "Incorrect Credentials!");
          event.target.reset();
        });
    });
});
