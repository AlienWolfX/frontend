function setRouter() {
  switch (window.location.pathname) {
    case "/admin/":
    case "/admin/index.html":
      if (localStorage.getItem("admin_token") !== null) {
        window.location.pathname = "/admin/dashboard.html";
      }
      break;

    case "/admin/dashboard.html":
      if (localStorage.getItem("admin_token") === null) {
        window.location.pathname = "/admin/index.html";
      }

      break;
    default:
      break;
  }
}

export { setRouter };
