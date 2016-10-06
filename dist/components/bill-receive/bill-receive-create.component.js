'use strict';

var names = ['Salário', 'Serviços', '13º Salário', 'Férias'];

window.billReceiveCreateComponent = Vue.extend({
  template: '\n    <form name="form" @submit.prevent="submit">\n      <label>Vencimento:<label>\n      <input type="text" v-model="bill_receive.date_due"/>\n      <br/><br/>\n      <label>Nome:<label>\n      <select v-model="bill_receive.name">\n        <option v-for="name in names" :value="name">{{ name }}</option>\n      </select>\n      <br/><br/>\n      <label>Valor:<label>\n      <input type="text" v-model="bill_receive.value"/>\n      <br/><br/>\n      <label>Situação:<label>\n      <span :class="{\'done\': bill_receive.done, \'pending\': !bill_receive.done}">\n        {{ bill_receive.done | billReceiveDoneLabel }}\n      </span>\n      <br/><br/>\n      <input type="submit" value="{{ action == \'create\' ? \'Adicionar\' : \'Alterar\' }}"/>\n    </form>\n  ',
  data: function data() {
    return {
      action: 'create',
      bill_receive: {
        date_due: '',
        name: '',
        value: 0,
        done: false
      },
      names: names
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
      var self = this;

      if (this.action == 'create') {
        BillReceive.save({}, this.bill_receive).then(function (response) {
          self.$router.go({ name: 'bill-receive.list' });
        });
      } else {
        BillReceive.update({ id: this.bill_receive.id }, this.bill_receive).then(function (response) {
          self.$router.go({ name: 'bill-receive.list' });
        });
      }
    },
    getBillReceive: function getBillReceive(id) {
      var self = this;

      BillReceive.get({ id: id }).then(function (response) {
        self.bill_receive = response.data;
      });
    }
  }
});