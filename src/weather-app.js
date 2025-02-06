import "./css/styles.css";

const fetchWeatherData = (function () {
  const init = async (city = "Paris", unitGroup = "metric") => {
    const safeGetWeatherData = withErrorHandling(getWeatherData);
    const result = await safeGetWeatherData(city, unitGroup);
    return result.success ? result.data : result.error;
  };

  async function getWeatherData(city, unitGroup) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=35JFJ6CSLRCFSD3EBAXLC9JDJ&contentType=json`,
      { mode: "cors" },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error! Status: ${response.status}, Details: ${errorText}`,
      );
    }
    const weatherData = await response.json();
    return weatherData;
  }

  function withErrorHandling(asyncFn) {
    return async function (...args) {
      try {
        const result = await asyncFn(...args);
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        console.error(error.message);
        return {
          success: false,
          error: error.message,
          timestamp: new Date(),
        };
      }
    };
  }

  return { init };
})();

const results = fetchWeatherData.init();
console.log(results);
