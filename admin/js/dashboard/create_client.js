import { backendURL, setRouter } from "../utils/utils.js";
setRouter();

var adminToken = localStorage.getItem("admin_token");

if (!adminToken) {
  console.error("Admin token not found in local Storage");
}

// Create Client
document.getElementById("create_client").addEventListener("click", function () {
  var firstName = document.getElementById("clientFirstName").value;
  var lastName = document.getElementById("clientLastName").value;
  var age = document.getElementById("clientAge").value;
  var email = document.getElementById("clientEmail").value;
  var password = document.getElementById("clientPassword").value;
  var contactNumber = document.getElementById("clientNumber").value;

  var formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("age", age);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("contact_number", contactNumber);

  fetch(`${backendURL}/api/register`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + adminToken,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      location.reload();
      $("#createModal").modal("hide");
      var successAlert = document.getElementById("successAlert");
      successAlert.textContent = "Client created successfully!";
      successAlert.classList.remove("d-none");
    })
    .catch((error) => {
      var errorAlert = document.getElementById("errorAlert");
      errorAlert.textContent = "Error creating client: " + error.message;
      errorAlert.classList.remove("d-none");
    });
});
