const payNames = [
  'CONTA DE LUZ',
  'CONTA DE ÁGUA',
  'CONTA DE TELEFONE',
  'SUPERMERCADO',
  'CARTÃO DE CRÉDITO',
  'EMPRÉSTIMO',
  'GASOLINA'
];

window.billPayCreateComponent = Vue.extend({
  template: `
    <div class="container">
      <form @submit.prevent="submit">
        <div class="input-field">
          <input id="date_due" type="text" v-model="bill_pay.date_due | dateLocalize">
          <label for="date_due">Vencimento</label>
        </div>

        <div class="input-field">
          <select v-model="bill_pay.name | upcase">
            <option v-for="name in names" :value="name">{{ name }}</option>
          </select>
          <label for="name">Nome</label>
        </div>

        <div class="input-field">
          <input id="value" type="text" v-model="bill_pay.value | numberToCurrency">
          <label for="value">Valor</label>
        </div>

        <p>
          <input type="checkbox" class="filled-in" id="done" v-model="bill_pay.done"/>
          <label for="done">Pago</label>
        </p>

        <button class="btn waves-effect waves-light" type="submit">
          {{ action == 'create' ? 'Adicionar' : 'Alterar' }}
        </button>
      </form>
    </div>
  `,
  data () {
    return {
      action: 'create',
      bill_pay: new Bill(),
      names: payNames
    }
  },
  created () {
    $(document).ready(function() {
      $('select').material_select();
    });

    if (this.$route.name == 'bill-pay.update') {
      this.action = 'update';
      this.getBillPay(this.$route.params.id);
    }
  },
  methods: {
    submit () {
      if (this.action == 'create') {
        BillPay.save({}, this.bill_pay.toJSON()).then((response) => {
          this.$router.go({ name: 'bill-pay.list' });
        });
      } else {
        BillPay.update({ id: this.bill_pay.id }, this.bill_pay.toJSON()).then((response) => {
          this.$router.go({ name: 'bill-pay.list' });
        });
      }
    },
    getBillPay (id) {
      BillPay.get({ id: id }).then((response) => {
        this.bill_pay = new Bill(response.data);
      });
    }
  }
});
