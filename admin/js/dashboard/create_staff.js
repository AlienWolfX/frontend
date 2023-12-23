import { backendURL, setRouter } from "../utils/utils.js";
setRouter();

var adminToken = localStorage.getItem("admin_token");

if (!adminToken) {
  console.error("Admin token not found in local Storage");
}

document.getElementById("create_staff").addEventListener("click", function () {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var age = document.getElementById("age").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var contactNumber = document.getElementById("contactNumber").value;
  var image = document.getElementById("image").files[0];

  var formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("age", age);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("contact_number", contactNumber);
  formData.append("profile_picture_path", image);

  fetch(`${backendURL}/api/staff`, {
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
      $("#createClientModal").modal("hide");
      var successAlert = document.getElementById("successAlert");
      successAlert.textContent = "Staff created successfully!";
      successAlert.classList.remove("d-none");
    })
    .catch((error) => {
      var errorAlert = document.getElementById("errorAlert");
      errorAlert.textContent = "Error creating staff: " + error.message;
      errorAlert.classList.remove("d-none");
    });
});
