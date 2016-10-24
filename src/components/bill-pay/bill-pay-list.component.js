window.billPayListComponent = Vue.extend({
  template: `
    <div class="container">
      <p :class="{ 'grey-text': status.count === 0, 'red-text': status.pending > 0, 'green-text': status.count > 0 && status.pending === 0 }">
        {{ status | billPaysStatusLabel }}
      </p>

      <table class="bordered striped responsive-table z-depth-1">
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
            <td>{{ bill_pay.date_due | dateLocalize }}</td>
            <td>{{ bill_pay.name | upcase }}</td>
            <td>{{ bill_pay.value | numberToCurrency }}</td>
            <td>
              <input id="done_{{ bill_pay.id }}" type="checkbox" v-model="bill_pay.done" @change="changeDoneBillPay(bill_pay)"/>
              <label for="done_{{ bill_pay.id }}">{{ bill_pay.done | billPayDoneLabel }}<label>
            </td>
            <td>
              <a v-link="{ name: 'bill-pay.update', params: { id: bill_pay.id } }">Editar</a> |
              <a href="#" @click.prevent="destroyBillPay(bill_pay)" class="destroy">Excluir</a>
            </td>
          </tr>
        </thead>
      </table>
    </div>
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
