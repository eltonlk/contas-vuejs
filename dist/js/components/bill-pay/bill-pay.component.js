'use strict';

window.billPayComponent = Vue.extend({
  components: {
    'bill-pay-menu-component': billPayMenuComponent
  },
  template: '\n    <div class="section">\n      <div class="container">\n        <h1>{{ title }}</h1>\n\n        <bill-pay-menu-component></bill-pay-menu-component>\n      </div>\n    </div>\n\n    <router-view></router-view>\n  ',
  data: function data() {
    return {
      title: 'Contas a Pagar'
    };
  }
});