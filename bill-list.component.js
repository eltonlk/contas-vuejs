window.billListComponent = Vue.extend({
  template: `
    <p :class="{ 'empty': status.count === 0, 'pending': status.pending > 0, 'done': status.count > 0 && status.pending === 0 }">
      {{ status | statusLabel }}
    </p>

    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>#</th>
          <th>Vencimento</th>
          <th>Nome</th>
          <th>Valor</th>
          <th>Situação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, bill) in bills">
          <td>{{ index + 1 }}</td>
          <td>{{ bill.date_due }}</td>
          <td>{{ bill.name }}</td>
          <td>{{ bill.value | currency 'R$ ' }}</td>
          <td :class="{'done': bill.done, 'pending': !bill.done}">
            <label>
              <input type="checkbox" v-model="bill.done"/>
              {{ bill.done | doneLabel }}
            <label>
          </td>
          <td>
            <a href="#" @click.prevent="loadBill(bill)">Editar</a> |
            <a href="#" @click.prevent="destroyBill(bill)" class="destroy">Excluir</a>
          </td>
        </tr>
      </thead>
    </table>
  `,
  data: function () {
    return {
      bills: [
        { date_due: '20/08/2016', name: 'Conta de luz'     , value: 175.98, done: true },
        { date_due: '21/08/2016', name: 'Festas'           , value: 250.40, done: false },
        { date_due: '22/08/2016', name: 'Supermercado'     , value: 550.00, done: false },
        { date_due: '23/08/2016', name: 'Conta de telefone', value: 75.45 , done: false },
        { date_due: '24/08/2016', name: 'Cartão de crédito', value: 800.36, done: false },
        { date_due: '25/08/2016', name: 'Empréstimo'       , value: 277.12, done: false },
        { date_due: '26/08/2016', name: 'Gasolina'         , value: 189.32, done: false }
      ]
    };
  },
  methods: {
    destroyBill: function (bill) {
      if (confirm('Deseja excluir essa conta?')) {
        this.bills.$remove(bill);
      }
    },
    loadBill: function (bill) {
      this.$dispatch('change-bill', bill);
      this.$dispatch('change-activedview', 1);
      this.$dispatch('change-formaction', 'update');
    }
  },
  computed: {
    status: function () {
      var done = 0;

      for(var i in this.bills) {
        if (this.bills[i].done) {
          done++;
        }
      }

      return {
        count: this.bills.length,
        pending: this.bills.length - done
      };
    }
  },
  events: {
    'new-bill': function (bill) {
      this.bills.push(bill);
    }
  }
});
