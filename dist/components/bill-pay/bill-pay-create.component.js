'use strict';

var payNames = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
  template: '\n    <form name="form" @submit.prevent="submit">\n      <label>Vencimento:<label>\n      <input type="text" v-model="bill_pay.date_due"/>\n      <br/><br/>\n      <label>Nome:<label>\n      <select v-model="bill_pay.name">\n        <option v-for="name in names" :value="name">{{ name }}</option>\n      </select>\n      <br/><br/>\n      <label>Valor:<label>\n      <input type="text" v-model="bill_pay.value | numberToCurrency"/>\n      <br/><br/>\n      <label>Situação:<label>\n      <span :class="{\'done\': bill_pay.done, \'pending\': !bill_pay.done}">\n        {{ bill_pay.done | billPayDoneLabel }}\n      </span>\n      <br/><br/>\n      <input type="submit" value="{{ action == \'create\' ? \'Adicionar\' : \'Alterar\' }}"/>\n    </form>\n  ',
  data: function data() {
    return {
      action: 'create',
      bill_pay: {
        date_due: '',
        name: '',
        value: 0,
        done: false
      },
      names: payNames
    };
  },
  created: function created() {
    if (this.$route.name == 'bill-pay.update') {
      this.action = 'update';
      this.getBillPay(this.$route.params.id);
    }
  },

  methods: {
    submit: function submit() {
      var _this = this;

      if (this.action == 'create') {
        BillPay.save({}, this.bill_pay).then(function (response) {
          _this.$router.go({ name: 'bill-pay.list' });
        });
      } else {
        BillPay.update({ id: this.bill_pay.id }, this.bill_pay).then(function (response) {
          _this.$router.go({ name: 'bill-pay.list' });
        });
      }
    },
    getBillPay: function getBillPay(id) {
      var _this2 = this;

      BillPay.get({ id: id }).then(function (response) {
        _this2.bill_pay = response.data;
      });
    }
  }
});