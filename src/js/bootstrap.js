require("materialize-css");

window.Vue = require("vue");
require("vue-resource");

require("../sass/app.scss");

require("./filters");
require("./filters/date_localize");
require("./filters/number_to_currency");
require("./filters/upcase");
require("./resources");
