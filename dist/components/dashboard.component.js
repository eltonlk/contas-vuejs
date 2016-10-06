'use strict';

window.dashboardComponent = Vue.extend({
  template: '\n    <h1>{{ title }}</h1>\n\n    <table border="1" cellpadding="10">\n      <thead>\n        <tr>\n          <th>#</th>\n          <th>Valor</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Entrada</td>\n          <td>{{ totalReceives | currency }}</td>\n        </tr>\n        <tr>\n          <td>Saída</td>\n          <td>{{ totalPays | currency }}</td>\n        </tr>\n      </thead>\n      <tfoot>\n        <tr>\n          <td>Saldo</td>\n          <td>{{ totalReceives - totalPays | currency }}</td>\n        </tr>\n      </tfoot>\n    </table>\n  ',
  data: function data() {
    return {
      title: 'Dashboard',
      totalPays: 0,
      totalReceives: 0
    };
  },
  created: function created() {
    var self = this;

    BillPay.total().then(function (response) {
      self.totalPays = response.data.total;
    });

    BillReceive.total().then(function (response) {
      self.totalReceives = response.data.total;
    });
  }
});