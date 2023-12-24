import { backendURL, setRouter } from "../utils/utils.js";
setRouter();

var adminToken = localStorage.getItem("admin_token");

if (!adminToken) {
  console.error("Admin token not found in local Storage");
}

// Function to fetch client data by ID
function fetchClientById(clientId) {
  return fetch(`${backendURL}/api/clients/${clientId}`, {
    headers: {
      Authorization: "Bearer " + adminToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching client data:", error);
    });
}

// Function to update the client data
function updateClient(clientId, newData) {
  return fetch(`${backendURL}/api/clients/${clientId}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + adminToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error updating client data:", error);
    });
}

// Function to populate the edit modal with client data
function populateEditModal(clientId) {
  fetchClientById(clientId).then((client) => {
    document.getElementById("editClientFirstName").value = client.first_name;
    document.getElementById("editClientLastName").value = client.last_name;
    document.getElementById("editClientAge").value = client.age;
    document.getElementById("editClientEmail").value = client.email;
    document.getElementById("editClientPassword").value = client.password;
    document.getElementById("editClientContactNumber").value =
      client.contact_number;

    // Add event listener to the "Save changes" button in the edit modal
    document
      .getElementById("saveChangesButton")
      .addEventListener("click", function () {
        // Get updated values from the modal inputs
        var updatedData = {
          first_name: document.getElementById("editClientFirstName").value,
          last_name: document.getElementById("editClientLastName").value,
          age: document.getElementById("editClientAge").value,
          email: document.getElementById("editClientEmail").value,
          password: document.getElementById("editClientPassword").value,
          contact_number: document.getElementById("editClientContactNumber")
            .value,
        };

        // Call the function to update the client data
        updateClient(clientId, updatedData);

        // Close the modal
        $("#editModal").modal("hide");

        // Display a success message or perform other actions as needed
      });
  });
}
