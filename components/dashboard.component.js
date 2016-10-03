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
  http: {
    root: 'http://127.0.0.1:8000/api'
  },
  data: function () {
    return {
      title: 'Dashboard',
      bill_receives: this.$root.$children[0].bill_receives,
      totalPays: 0
    };
  },
  created: function () {
    var self = this;

    BillPay.total().then(function (response) {
      self.totalPays = response.data.total;
    });
  },
  computed: {
    totalReceives: function () {
      var total = 0;

      for(var i in this.bill_receives) {
        total += this.bill_receives[i].value;
      }

      return total;
    }
  }
});
