window.billReceiveListComponent = Vue.extend({
  template: `
    <div class="container">
      <p :class="{ 'grey-text': status.count === 0, 'red-text': status.pending > 0, 'green-text': status.count > 0 && status.pending === 0 }">
        {{ status | billReceivesStatusLabel }}
      </p>

      <table class="bordered striped responsive-table">
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
            <td>{{ bill_receive.date_due | dateLocalize 'ko-KR' }}</td>
            <td>{{ bill_receive.name | upcase }}</td>
            <td>{{ bill_receive.value | numberToCurrency 'pt-BR' }}</td>
            <td>
              <input id="done_{{ bill_receive.id }}" type="checkbox" v-model="bill_receive.done" @change="changeDoneBillReceive(bill_receive)"/>
              <label for="done_{{ bill_receive.id }}">{{ bill_receive.done | billReceiveDoneLabel }}<label>
            </td>
            <td>
              <a v-link="{ name: 'bill-receive.update', params: { id: bill_receive.id } }">Editar</a> |
              <a href="#" @click.prevent="destroyBillReceive(bill_receive)" class="destroy">Excluir</a>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  `,
  data () {
    return {
      bill_receives: []
    };
  },
  created () {
    BillReceive.query().then((response) => {
      this.bill_receives = response.data;
    });
  },
  methods: {
    changeDoneBillReceive (bill_receive) {
      if (confirm('Deseja alterar a situação dessa conta?')) {
        BillReceive.update({ id: bill_receive.id }, bill_receive);
      }
    },
    destroyBillReceive (bill_receive) {
      if (confirm('Deseja excluir essa conta?')) {
        BillReceive.delete({ id: bill_receive.id }).then((response) => {
          this.bill_receives.$remove(bill_receive);
        });
      }
    }
  },
  computed: {
    status () {
      let done = 0;

      for(let i in this.bill_receives) {
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
