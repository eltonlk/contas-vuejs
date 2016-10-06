'use strict';

window.billReceiveComponent = Vue.extend({
  components: {
    'bill-receive-menu-component': billReceiveMenuComponent
  },
  template: '\n    <h1>{{ title }}</h1>\n\n    <bill-receive-menu-component></bill-receive-menu-component>\n\n    <router-view></router-view>\n  ',
  data: function data() {
    return {
      title: 'Contas a Receber'
    };
  }
});