'use strict';

var receiveNames = ['SALÁRIO', 'SERVIÇOS', '13º SALAÁRIO', 'FÉRIAS'];

window.billReceiveCreateComponent = Vue.extend({
  template: '\n    <form name="form" @submit.prevent="submit">\n      <label>Vencimento:<label>\n      <input type="text" v-model="bill_receive.date_due | dateLocalize"/>\n      <br/><br/>\n      <label>Nome:<label>\n      <select v-model="bill_receive.name | upcase">\n        <option v-for="name in names" :value="name">{{ name }}</option>\n      </select>\n      <br/><br/>\n      <label>Valor:<label>\n      <input type="text" v-model="bill_receive.value | numberToCurrency"/>\n      <br/><br/>\n      <label>Situação:<label>\n      <span :class="{\'done\': bill_receive.done, \'pending\': !bill_receive.done}">\n        {{ bill_receive.done | billReceiveDoneLabel }}\n      </span>\n      <br/><br/>\n      <input type="submit" value="{{ action == \'create\' ? \'Adicionar\' : \'Alterar\' }}"/>\n    </form>\n  ',
  data: function data() {
    return {
      action: 'create',
      bill_receive: new Bill(),
      names: receiveNames
    };
  },
  created: function created() {
    if (this.$route.name == 'bill-receive.update') {
      this.action = 'update';
      this.getBillReceive(this.$route.params.id);
    }
  },

  methods: {
    submit: function submit() {
      var _this = this;

      if (this.action == 'create') {
        BillReceive.save({}, this.bill_receive.toJSON()).then(function (response) {
          _this.$router.go({ name: 'bill-receive.list' });
        });
      } else {
        BillReceive.update({ id: this.bill_receive.id }, this.bill_receive.toJSON()).then(function (response) {
          _this.$router.go({ name: 'bill-receive.list' });
        });
      }
    },
    getBillReceive: function getBillReceive(id) {
      var _this2 = this;

      BillReceive.get({ id: id }).then(function (response) {
        _this2.bill_receive = new Bill(response.data);
      });
    }
  }
});