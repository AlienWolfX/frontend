import { backendURL, setRouter } from "../utils/utils.js";
setRouter();

var adminToken = localStorage.getItem("admin_token");

if (!adminToken) {
  console.error("Admin token not found in local Storage");
}

function fetchClientData() {
  return fetch(backendURL + "/api/clients", {
    headers: {
      Authorization: "Bearer " + adminToken,
      "Content-Type": "application/json",
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

function updateClientTable(data) {
  var tableBody = document.getElementById("clientTableBody");
  tableBody.innerHTML = "";

  data.forEach((client) => {
    var row =
      "<tr>" +
      "<td>" +
      client.first_name +
      "</td>" +
      "<td>" +
      client.last_name +
      "</td>" +
      "<td>" +
      client.age +
      "</td>" +
      "<td>" +
      client.email +
      "</td>" +
      "<td>" +
      client.contact_number +
      "</td>" +
      "<td>" +
      '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal">Edit</button>' +
      '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="deleteClient(' +
      client.client_id +
      ')">Delete</button>' +
      "</td>" +
      "</tr>";

    tableBody.innerHTML += row;
  });
}

function searchAndDisplayClientData(searchInput) {
  fetchClientData().then((data) => {
    if (searchInput) {
      // Filter data based on the search input
      data = data.filter(
        (client) =>
          client.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          client.last_name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    updateClientTable(data);
  });
}

// Initial fetch and display for client table
searchAndDisplayClientData("");

// Add event listener for the search button for client table
document.getElementById("searchButton").addEventListener("click", function () {
  var searchInput = document.getElementById("searchInput").value;
  searchAndDisplayClientData(searchInput);
});

// Staff Table
function fetchStaffData() {
  return fetch(backendURL + "/api/staff", {
    headers: {
      Authorization: "Bearer " + adminToken,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching staff data:", error);
    });
}

function updateStaffTable(data) {
  var tableBody = document.getElementById("staffTableBody");
  tableBody.innerHTML = "";

  data.forEach((staff) => {
    var row =
      "<tr>" +
      "<td>" +
      staff.first_name +
      "</td>" +
      "<td>" +
      staff.last_name +
      "</td>" +
      "<td>" +
      staff.age +
      "</td>" +
      "<td>" +
      staff.email +
      "</td>" +
      "<td>" +
      staff.contact_number +
      "</td>" +
      "<td>" +
      '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal">Edit</button>' +
      '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="deleteStaff(' +
      staff.staff_id +
      ')">Delete</button>' +
      "</td>" +
      "</tr>";

    tableBody.innerHTML += row;
  });
}

function searchAndDisplayStaffData(searchInput) {
  fetchStaffData().then((data) => {
    if (searchInput) {
      data = data.filter(
        (staff) =>
          staff.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          staff.last_name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    updateStaffTable(data);
  });
}

// Initial fetch and display for staff table
searchAndDisplayStaffData("");

// Add event listener for the search button for staff table
// document
//   .getElementById("staffSearchButton")
//   .addEventListener("click", function () {
//     var searchInput = document.getElementById("staffSearchInput").value;
//     searchAndDisplayStaffData(searchInput);
//   });
