window.billPayListComponent = Vue.extend({
  template: `
    <p :class="{ 'empty': status.count === 0, 'pending': status.pending > 0, 'done': status.count > 0 && status.pending === 0 }">
      {{ status | billPaysStatusLabel }}
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
        <tr v-for="(index, bill_pay) in bill_pays">
          <td>{{ index + 1 }}</td>
          <td>{{ bill_pay.date_due }}</td>
          <td>{{ bill_pay.name }}</td>
          <td>{{ bill_pay.value | currency 'R$ ' }}</td>
          <td :class="{'done': bill_pay.done, 'pending': !bill_pay.done}">
            <label>
              <input type="checkbox" v-model="bill_pay.done" @change="changeDoneBillPay(bill_pay)"/>
              {{ bill_pay.done | billPayDoneLabel }}
            <label>
          </td>
          <td>
            <a v-link="{ name: 'bill-pay.update', params: { id: bill_pay.id } }">Editar</a> |
            <a href="#" @click.prevent="destroyBillPay(bill_pay)" class="destroy">Excluir</a>
          </td>
        </tr>
      </thead>
    </table>
  `,
  data () {
    return {
      bill_pays: []
    };
  },
  created () {
    BillPay.query().then((response) => {
      this.bill_pays = response.data;
    });
  },
  methods: {
    changeDoneBillPay (bill_pay) {
      if (confirm('Deseja alterar a situação dessa conta?')) {
        BillPay.update({ id: bill_pay.id }, bill_pay);
      }
    },
    destroyBillPay (bill_pay) {
      if (confirm('Deseja excluir essa conta?')) {
        BillPay.delete({ id: bill_pay.id }).then((response) => {
          this.bill_pays.$remove(bill_pay);
        });
      }
    }
  },
  computed: {
    status () {
      let done = 0;

      for(let i in this.bill_pays) {
        if (this.bill_pays[i].done) {
          done++;
        }
      }

      return {
        count: this.bill_pays.length,
        pending: this.bill_pays.length - done
      };
    }
  }
});
