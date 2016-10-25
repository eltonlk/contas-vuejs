'use strict';

Vue.filter('upcase', {
  read: function read(value) {
    if (value) {
      return value.toUpperCase();
    }

    return value;
  },
  write: function write(value) {
    if (value) {
      return value.toLowerCase();
    }

    return value;
  }
});