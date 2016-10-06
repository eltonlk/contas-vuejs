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
          <td>{{ totalReceives | numberToCurrency }}</td>
        </tr>
        <tr>
          <td>Saída</td>
          <td>{{ totalPays | numberToCurrency }}</td>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td>Saldo</td>
          <td>{{ totalReceives - totalPays | numberToCurrency }}</td>
        </tr>
      </tfoot>
    </table>
  `,
  data () {
    return {
      title: 'Dashboard',
      totalPays: 0,
      totalReceives: 0
    };
  },
  created () {
    BillPay.total().then((response) => {
      this.totalPays = response.data.total;
    });

    BillReceive.total().then((response) => {
      this.totalReceives = response.data.total;
    });
  }
});
