const receiveNames = [
  'SALÁRIO',
  'SERVIÇOS',
  '13º SALAÁRIO',
  'FÉRIAS'
];

window.billReceiveCreateComponent = Vue.extend({
  template: `
    <div class="container">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="input-field col s6">
            <input id="date_due" type="text" v-model="bill_receive.date_due | dateLocalize">
            <label for="date_due" class="active">Vencimento</label>
          </div>

          <div class="input-field col s6">
            <input id="value" type="text" v-model="bill_receive.value | numberToCurrency">
            <label for="value" class="active">Valor</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s6">
            <select class="browser-default" v-model="bill_receive.name | upcase">
              <option v-for="name in names" :value="name">{{ name }}</option>
            </select>
            <label for="name" class="active">Nome</label>
          </div>

          <div class="input-field col s6">
            <input type="checkbox" class="filled-in" id="done" v-model="bill_receive.done"/>
            <label for="done">Pago</label>
          </div>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ action == 'create' ? 'Adicionar' : 'Alterar' }}
        </button>
      </form>
    </div>
  `,
  data () {
    return {
      action: 'create',
      bill_receive: new Bill(),
      names: receiveNames
    }
  },
  created () {
    $(document).ready(function() {
      $('select').material_select();
    });

    if (this.$route.name == 'bill-receive.update') {
      this.action = 'update';
      this.getBillReceive(this.$route.params.id);
    }
  },
  methods: {
    submit () {
      if (this.action == 'create') {
        BillReceive.save({}, this.bill_receive.toJSON()).then((response) => {
          this.$router.go({ name: 'bill-receive.list' });

          Materialize.toast('Conta criada com sucesso!', 4000);
        });
      } else {
        BillReceive.update({ id: this.bill_receive.id }, this.bill_receive.toJSON()).then((response) => {
          this.$router.go({ name: 'bill-receive.list' });

          Materialize.toast('Conta atualizada com sucesso!', 4000);
        });
      }
    },
    getBillReceive (id) {
      BillReceive.get({ id: id }).then((response) => {
        this.bill_receive = new Bill(response.data);
      });
    }
  }
});
