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
      bills: this.$root.$children[0].bills
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
