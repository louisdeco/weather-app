import fetchWeatherData from "./fetchWeatherData.js";
import displayHandler from "./displayHandler.js";

const domInteractivity = (function () {
  let currentUnit = "metric";

  const init = () => {
    searchCity();
    toggleUnit();
  };

  async function searchCity() {
    const searchForm = document.querySelector("#weatherForm");
    searchForm.addEventListener("keypress", async (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        updateWeatherDisplay();
      }
    });
  }

  function toggleUnit() {
    const toggleButton = document.querySelector("#unitToggle");
    toggleButton.addEventListener("click", async () => {
      currentUnit = currentUnit === "metric" ? "us" : "metric";
      toggleUnitIcon();
      await updateWeatherDisplay();
    });
  }

  function toggleUnitIcon() {
    document.querySelector(".toggle-icon-on").classList.toggle("hidden");
    document.querySelector(".toggle-icon-off").classList.toggle("hidden");
  }

  async function updateWeatherDisplay() {
    displayHandler.setDisplayState(displayHandler.DOM.loading);
    const city = getCurrentCity();
    const results = await fetchWeatherData.init(city, currentUnit);
    if (results.success) {
      displayHandler.displayWeatherData(results.data, currentUnit);
    } else {
      displayHandler.displayError(results.error);
    }
  }

  function getCurrentCity() {
    const cityInput = document.querySelector("#cityInput");
    return cityInput.value.trim() || "Paris";
  }

  return { init, currentUnit };
})();

export default domInteractivity;
