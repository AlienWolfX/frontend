import { backendURL, showAlert, setRouter } from "../utils/utils.js";
setRouter();

const logout = document.getElementById("btn-logout");

logout.onclick = async () => {
  const response = await fetch(`${backendURL}/api/logout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    },
  });

  if (response.ok) {
    localStorage.removeItem("admin_token");

    window.location.href = "index.html";
  } else {
    console.error("Logout failed");
  }
};

getUserInfo();
async function getUserInfo() {
  const response = await fetch(`${backendURL}/api/profile/show`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    },
  });

  if (response.ok) {
    const json = await response.json();

    document.getElementById("user_name").innerHTML =
      json.first_name + " " + json.last_name;

    document.getElementById("user_name1").innerHTML =
      json.first_name + " " + json.last_name;
  } else {
    console.error("Fetch failed");
  }
}
