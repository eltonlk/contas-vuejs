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
          <td>{{ totalReceived | currency }}</td>
        </tr>
        <tr>
          <td>Saída</td>
          <td>{{ totalPaid | currency }}</td>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td>Saldo</td>
          <td>{{ totalReceived - totalPaid | currency }}</td>
        </tr>
      </tfoot>
    </table>
  `,
  data: function () {
    return {
      title: 'Dashboard',
      bill_pays: this.$root.$children[0].bill_pays,
      bill_receives: this.$root.$children[0].bill_receives
    };
  },
  computed: {
    totalPaid: function () {
      var total = 0;

      for(var i in this.bill_pays) {
        if (this.bill_pays[i].done) {
          total += this.bill_pays[i].value;
        }
      }

      return total;
    },
    totalReceived: function () {
      var total = 0;

      for(var i in this.bill_receives) {
        if (this.bill_receives[i].done) {
          total += this.bill_receives[i].value;
        }
      }

      return total;
    }
  }
});
