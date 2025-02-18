import "./css/styles.css";

import displayHandler from "./modules/displayHandler.js";
import domInteractivity from "./modules/domInteractivity.js";

const weatherApp = (function () {
  const init = () => {
    displayHandler.init();
    domInteractivity.init();
  };

  return { init };
})();

weatherApp.init();
