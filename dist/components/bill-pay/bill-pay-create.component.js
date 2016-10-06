'use strict';

window.billPayCreateComponent = Vue.extend({
  template: '\n    <form name="form" @submit.prevent="submit">\n      <label>Vencimento:<label>\n      <input type="text" v-model="bill_pay.date_due"/>\n      <br/><br/>\n      <label>Nome:<label>\n      <select v-model="bill_pay.name">\n        <option v-for="name in names" :value="name">{{ name }}</option>\n      </select>\n      <br/><br/>\n      <label>Valor:<label>\n      <input type="text" v-model="bill_pay.value"/>\n      <br/><br/>\n      <label>Situação:<label>\n      <span :class="{\'done\': bill_pay.done, \'pending\': !bill_pay.done}">\n        {{ bill_pay.done | billPayDoneLabel }}\n      </span>\n      <br/><br/>\n      <input type="submit" value="{{ action == \'create\' ? \'Adicionar\' : \'Alterar\' }}"/>\n    </form>\n  ',
  data: function data() {
    return {
      action: 'create',
      bill_pay: {
        date_due: '',
        name: '',
        value: 0,
        done: false
      },
      names: ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina']
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
      var self = this;

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
    getBillPay: function getBillPay(id) {
      var self = this;

      BillPay.get({ id: id }).then(function (response) {
        self.bill_pay = response.data;
      });
    }
  }
});