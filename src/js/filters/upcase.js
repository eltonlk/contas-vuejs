Vue.filter('upcase', {
  read (value) {
    if (value) {
      return value.toUpperCase();
    }

    return value;
  },
  write (value) {
    if (value) {
      return value.toLowerCase();
    }

    return value;
  }
});
