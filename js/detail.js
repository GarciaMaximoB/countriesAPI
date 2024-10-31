document.addEventListener("DOMContentLoaded", () => {
  const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));

  if (selectedCountry) {
    const detailContainer = document.querySelector(".country-detail");

    document.getElementById("detail-flag").src = selectedCountry.flags.svg;
    document.getElementById(
      "detail-flag"
    ).alt = `Bandera de ${selectedCountry.translations.spa.common}`;

    document.getElementById("detail-name").textContent =
      selectedCountry.translations.spa.common;
    document.getElementById("official-name").textContent =
      selectedCountry.translations.spa.official;

    document.getElementById("detail-capital").textContent =
      selectedCountry.capital ? selectedCountry.capital[0] : "N/A";
    document.getElementById("detail-language").textContent =
      selectedCountry.languages
        ? Object.values(selectedCountry.languages).join(", ")
        : "N/A";
    document.getElementById("detail-population").textContent =
      selectedCountry.population.toLocaleString();
    document.getElementById(
      "detail-area"
    ).textContent = `${selectedCountry.area.toLocaleString()} km²`;

    if (selectedCountry.maps && selectedCountry.maps.googleMaps) {
      detailContainer.style.cursor = "pointer";
      detailContainer.addEventListener("click", () => {
        window.open(selectedCountry.maps.googleMaps, "_blank");
      });
    } else {
      console.error(
        "No se encontró un enlace a Google Maps para el país seleccionado"
      );
    }
  } else {
    console.error("No se encontró el país seleccionado en localStorage");
  }

  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
