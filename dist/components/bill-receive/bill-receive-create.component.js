'use strict';

var receiveNames = ['SALÁRIO', 'SERVIÇOS', '13º SALAÁRIO', 'FÉRIAS'];

window.billReceiveCreateComponent = Vue.extend({
  template: '\n    <div class="container">\n      <form @submit.prevent="submit">\n        <div class="row">\n          <div class="input-field col s6">\n            <input id="date_due" type="text" v-model="bill_receive.date_due | dateLocalize">\n            <label for="date_due" class="active">Vencimento</label>\n          </div>\n\n          <div class="input-field col s6">\n            <input id="value" type="text" v-model="bill_receive.value | numberToCurrency">\n            <label for="value" class="active">Valor</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s6">\n            <select class="browser-default" v-model="bill_receive.name | upcase">\n              <option v-for="name in names" :value="name">{{ name }}</option>\n            </select>\n            <label for="name" class="active">Nome</label>\n          </div>\n\n          <div class="input-field col s6">\n            <input type="checkbox" class="filled-in" id="done" v-model="bill_receive.done"/>\n            <label for="done">Pago</label>\n          </div>\n        </div>\n\n        <button class="btn waves-effect waves-light" type="submit">\n          {{ action == \'create\' ? \'Adicionar\' : \'Alterar\' }}\n        </button>\n      </form>\n    </div>\n  ',
  data: function data() {
    return {
      action: 'create',
      bill_receive: new Bill(),
      names: receiveNames
    };
  },
  created: function created() {
    $(document).ready(function () {
      $('select').material_select();
    });

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