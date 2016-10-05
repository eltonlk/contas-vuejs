window.dashboardComponent = Vue.extend({
  template: `
    <h1>{{ title }}</h1>

    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>#</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Entrada</td>
          <td>{{ totalReceives | currency }}</td>
        </tr>
        <tr>
          <td>Saída</td>
          <td>{{ totalPays | currency }}</td>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td>Saldo</td>
          <td>{{ totalReceives - totalPays | currency }}</td>
        </tr>
      </tfoot>
    </table>
  `,
  data: function () {
    return {
      title: 'Dashboard',
      totalPays: 0,
      totalReceives: 0
    };
  },
  created: function () {
    var self = this;

    BillPay.total().then(function (response) {
      self.totalPays = response.data.total;
    });

    BillReceive.total().then(function (response) {
      self.totalReceives = response.data.total;
    });
  }
});
