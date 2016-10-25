"use strict";

var dateLocalize = function dateLocalize() {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "pt-BR";

    return new Intl.DateTimeFormat(locale);
};

var numberToCurrency = function numberToCurrency() {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "pt-BR";

    return new Intl.NumberFormat(locale, {
        minimumFractionDigitis: 2,
        maximumFractionDigitis: 2,
        style: "currency",
        currency: "BRL"
    });
};