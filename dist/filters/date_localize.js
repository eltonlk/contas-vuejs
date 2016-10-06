'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Vue.filter('dateLocalize', {
  read: function read(value, locale) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
      if (!(value instanceof Date)) {
        var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);

        if (dateRegex) {
          value = new Date(dateRegex[0] + "T03:00:00");
        } else {
          return value;
        }
      }

      return dateLocalize(locale).format(value);
    }

    return value;
  },
  write: function write(value, locale) {
    var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);

    if (dateRegex) {
      var date = new Date(dateRegex[0].split('/').reverse().join('-') + "T03:00:00");

      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    return value;
  }
});