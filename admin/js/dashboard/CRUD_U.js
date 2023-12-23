var adminToken = localStorage.getItem("admin_token");

if (!adminToken) {
  console.error("Admin token not found in local Storage");
}

function fetchData() {
  return fetch("http://alluc.test/api/clients", {
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
      console.error("Error fetching data:", error);
    });
}

function updateTable(data) {
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
      '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#viewModal">View</button>' +
      '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button>' +
      "</td>" +
      "</tr>";

    tableBody.innerHTML += row;
  });
}

function searchAndDisplayData(searchInput) {
  fetchData().then((data) => {
    if (searchInput) {
      // Filter data based on the search input
      data = data.filter(
        (client) =>
          client.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          client.last_name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    updateTable(data);
  });
}

// Initial fetch and display
searchAndDisplayData("");

// Add event listener for the search button
document.getElementById("searchButton").addEventListener("click", function () {
  var searchInput = document.getElementById("searchInput").value;
  searchAndDisplayData(searchInput);
});
