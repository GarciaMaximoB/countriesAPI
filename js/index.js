const countriesGrid = document.querySelector(".countries-grid");

if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}
let cerrarSesionBtn = document.getElementById("logout-btn");
if (cerrarSesionBtn) {
  cerrarSesionBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
}

async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Error al obtener los países");

    const countries = await response.json();
    const limitedCountries = countries.slice(0, 128);

    limitedCountries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `Bandera de ${country.translations.spa.common}`;
      flagImg.classList.add("country-flag");

      const countryName = document.createElement("p");
      countryName.textContent = country.translations.spa.common;
      countryName.classList.add("country-name");

      countryCard.appendChild(flagImg);
      countryCard.appendChild(countryName);
      countriesGrid.appendChild(countryCard);

      countryCard.addEventListener("click", () => {
        localStorage.setItem("selectedCountry", JSON.stringify(country));
        window.location.href = "detail.html";
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchCountries();
