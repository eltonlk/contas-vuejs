window.billReceiveListComponent = Vue.extend({
  components: {
    'modal': modalComponent
  },
  template: `
    <div class="container">
      <p :class="{ 'grey-text': status.count === 0, 'red-text': status.pending > 0, 'green-text': status.count > 0 && status.pending === 0 }">
        {{ status | billReceivesStatusLabel }}
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
              <a href="#" @click.prevent="openModalDelete(bill_receive)" class="destroy">Excluir</a>
            </td>
          </tr>
        </thead>
      </table>
    </div>
    <modal :modal="modal">
      <div slot="content">
        <h4>Mensagem de confirmação</h4>
        <p><strong>Deseja excluir esta conta?</strong></p>
        <div class="divider"></div>
        <p>Nome: <strong>{{ billToDelete.name | upcase }}</strong></p>
        <p>Valor: <strong>{{ billToDelete.value | numberToCurrency 'pt-BR' }}</strong></p>
        <p>Data de vencimento: <strong>{{ billToDelete.date_due | dateLocalize 'ko-KR' }}</strong></p>
        <div class="divider"></div>
      </div>
      <div slot="footer">
        <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="destroyBillReceive()">OK</button>
        <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
      </div>
    </modal>
  `,
  data () {
    return {
      bill_receives: [],
      billToDelete: null,
      modal: {
        id: 'modal-delete'
      }
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
    destroyBillReceive () {
      BillReceive.delete({ id: this.billToDelete.id }).then((response) => {
        this.bill_receives.$remove(this.billToDelete);
      });
    },
    openModalDelete (bill_receive) {
      this.billToDelete = bill_receive;

      $('#modal-delete').openModal();
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
