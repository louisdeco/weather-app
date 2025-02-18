import fetchWeatherData from "./fetchWeatherData.js";
import displayHandler from "./displayHandler.js";

const domInteractivity = (function () {
  const init = () => {
    searchCity();
  };

  async function searchCity() {
    const searchForm = document.querySelector("#weatherForm");
    const cityInput = document.querySelector("#cityInput");
    searchForm.addEventListener("keypress", async (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        const city = cityInput.value.trim();
        const results = await fetchWeatherData.init(city || "Paris", "metric");
        console.log(results);
        if (results.success) {
          displayHandler.displayWeatherData(results.data);
        } else {
          displayHandler.displayError(results.error);
        }
      }
    });
  }

  return { init };
})();

export default domInteractivity;
