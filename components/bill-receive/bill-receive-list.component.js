window.billReceiveListComponent = Vue.extend({
  template: `
    <p :class="{ 'empty': status.count === 0, 'pending': status.pending > 0, 'done': status.count > 0 && status.pending === 0 }">
      {{ status | billReceivesStatusLabel }}
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
        <tr v-for="(index, bill_receive) in bill_receives">
          <td>{{ index + 1 }}</td>
          <td>{{ bill_receive.date_due }}</td>
          <td>{{ bill_receive.name }}</td>
          <td>{{ bill_receive.value | currency 'R$ ' }}</td>
          <td :class="{'done': bill_receive.done, 'pending': !bill_receive.done}">
            <label>
              <input type="checkbox" v-model="bill_receive.done" @change="changeDoneBillReceive(bill_receive)"/>
              {{ bill_receive.done | billReceiveDoneLabel }}
            <label>
          </td>
          <td>
            <a v-link="{ name: 'bill-receive.update', params: { id: bill_receive.id } }">Editar</a> |
            <a href="#" @click.prevent="destroyBillReceive(bill_receive)" class="destroy">Excluir</a>
          </td>
        </tr>
      </thead>
    </table>
  `,
  data: function () {
    return {
      bill_receives: []
    };
  },
  created: function () {
    var self = this;

    BillReceive.query().then(function (response) {
      self.bill_receives = response.data;
    });
  },
  methods: {
    changeDoneBillReceive: function (bill_receive) {
      if (confirm('Deseja alterar a situação dessa conta?')) {
        BillReceive.update({ id: bill_receive.id }, bill_receive);
      }
    },
    destroyBillReceive: function (bill_receive) {
      if (confirm('Deseja excluir essa conta?')) {
        var self = this;

        BillReceive.delete({ id: bill_receive.id }).then(function (response) {
          self.bill_receives.$remove(bill_receive);
        });
      }
    }
  },
  computed: {
    status: function () {
      var done = 0;

      for(var i in this.bill_receives) {
        if (this.bill_receives[i].done) {
          done++;
        }
      }

      return {
        count: this.bill_receives.length,
        pending: this.bill_receives.length - done
      };
    }
  }
});
