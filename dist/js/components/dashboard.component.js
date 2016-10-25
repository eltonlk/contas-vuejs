'use strict';

window.dashboardComponent = Vue.extend({
  template: '\n    <div class="container">\n      <div class="section">\n        <h1>{{ title }}</h1>\n      <div>\n\n      <div class="row">\n        <div class="col s12 m4">\n          <ul class="collection with-header">\n            <li class="collection-header blue-grey darken-3 white-text">\n              <h6>Contas</h6>\n            </li>\n            <li class="collection-item">\n              Receber\n              <span class="badge green-text">{{ totalReceives | numberToCurrency }}</span>\n            </li>\n            <li class="collection-item">\n              Pagar\n              <span class="badge red-text">{{ totalPays | numberToCurrency }}</span>\n            </li>\n            <li class="collection-item">\n              <strong>\n                Total\n                <span class="badge">{{ totalReceives - totalPays | numberToCurrency }}</span>\n              </strong>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  ',
  data: function data() {
    return {
      title: 'Dashboard',
      totalPays: 0,
      totalReceives: 0
    };
  },
  created: function created() {
    var _this = this;

    BillPay.total().then(function (response) {
      _this.totalPays = response.data.total;
    });

    BillReceive.total().then(function (response) {
      _this.totalReceives = response.data.total;
    });
  }
});