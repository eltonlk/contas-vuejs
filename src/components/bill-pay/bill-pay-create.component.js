const payNames = [
  'Conta de luz',
  'Conta de água',
  'Conta de telefone',
  'Supermercado',
  'Cartão de crédito',
  'Empréstimo',
  'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
  template: `
    <form name="form" @submit.prevent="submit">
      <label>Vencimento:<label>
      <input type="text" v-model="bill_pay.date_due | dateLocalize"/>
      <br/><br/>
      <label>Nome:<label>
      <select v-model="bill_pay.name">
        <option v-for="name in names" :value="name">{{ name }}</option>
      </select>
      <br/><br/>
      <label>Valor:<label>
      <input type="text" v-model="bill_pay.value | numberToCurrency"/>
      <br/><br/>
      <label>Situação:<label>
      <span :class="{'done': bill_pay.done, 'pending': !bill_pay.done}">
        {{ bill_pay.done | billPayDoneLabel }}
      </span>
      <br/><br/>
      <input type="submit" value="{{ action == 'create' ? 'Adicionar' : 'Alterar' }}"/>
    </form>
  `,
  data () {
    return {
      action: 'create',
      bill_pay: new Bill(),
      names: payNames
    }
  },
  created () {
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
