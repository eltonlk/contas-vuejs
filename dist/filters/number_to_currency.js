'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Vue.filter('numberToCurrency', {
  read: function read(value) {
    var number = 0;

    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
      var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);

      number = numberRegex ? numberRegex[0] : 0;
    }

    return numberToCurrency.format(number);
  },
  write: function write(value) {
    var number = 0;

    if (value.length > 0) {
      number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');

      number = isNaN(number) ? 0 : parseFloat(number);
    }

    return number;
  }
});