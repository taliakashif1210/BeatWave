document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) {
    console.error("Navbar container not found!");
    return;
  }

  // Fetch navbar HTML
  fetch("components/navbar.html")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then(data => {
      navbarContainer.innerHTML = data;
    })
    .catch(error => console.error(error));
});
