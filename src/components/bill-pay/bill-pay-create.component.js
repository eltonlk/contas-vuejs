const names = [
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
      <input type="text" v-model="bill_pay.date_due"/>
      <br/><br/>
      <label>Nome:<label>
      <select v-model="bill_pay.name">
        <option v-for="name in names" :value="name">{{ name }}</option>
      </select>
      <br/><br/>
      <label>Valor:<label>
      <input type="text" v-model="bill_pay.value"/>
      <br/><br/>
      <label>Situação:<label>
      <span :class="{'done': bill_pay.done, 'pending': !bill_pay.done}">
        {{ bill_pay.done | billPayDoneLabel }}
      </span>
      <br/><br/>
      <input type="submit" value="{{ action == 'create' ? 'Adicionar' : 'Alterar' }}"/>
    </form>
  `,
  data: function () {
    return {
      action: 'create',
      bill_pay: {
        date_due: '',
        name: '',
        value: 0,
        done: false
      },
      names: names
    }
  },
  created: function () {
    if (this.$route.name == 'bill-pay.update') {
      this.action = 'update';
      this.getBillPay(this.$route.params.id);
    }
  },
  methods: {
    submit: function () {
      let self = this;

      if (this.action == 'create') {
        BillPay.save({}, this.bill_pay).then(function (response) {
          self.$router.go({ name: 'bill-pay.list' });
        });
      } else {
        BillPay.update({ id: this.bill_pay.id }, this.bill_pay).then(function (response) {
          self.$router.go({ name: 'bill-pay.list' });
        });
      }
    },
    getBillPay: function (id) {
      let self = this;

      BillPay.get({ id: id }).then(function (response) {
        self.bill_pay = response.data;
      });
    }
  }
});
