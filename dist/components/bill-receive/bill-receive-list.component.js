'use strict';

window.billReceiveListComponent = Vue.extend({
  template: '\n    <p :class="{ \'empty\': status.count === 0, \'pending\': status.pending > 0, \'done\': status.count > 0 && status.pending === 0 }">\n      {{ status | billReceivesStatusLabel }}\n    </p>\n\n    <table border="1" cellpadding="10">\n      <thead>\n        <tr>\n          <th>#</th>\n          <th>Vencimento</th>\n          <th>Nome</th>\n          <th>Valor</th>\n          <th>Situação</th>\n          <th>Ações</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr v-for="(index, bill_receive) in bill_receives">\n          <td>{{ index + 1 }}</td>\n          <td>{{ bill_receive.date_due }}</td>\n          <td>{{ bill_receive.name }}</td>\n          <td>{{ bill_receive.value | numberToCurrency }}</td>\n          <td :class="{\'done\': bill_receive.done, \'pending\': !bill_receive.done}">\n            <label>\n              <input type="checkbox" v-model="bill_receive.done" @change="changeDoneBillReceive(bill_receive)"/>\n              {{ bill_receive.done | billReceiveDoneLabel }}\n            <label>\n          </td>\n          <td>\n            <a v-link="{ name: \'bill-receive.update\', params: { id: bill_receive.id } }">Editar</a> |\n            <a href="#" @click.prevent="destroyBillReceive(bill_receive)" class="destroy">Excluir</a>\n          </td>\n        </tr>\n      </thead>\n    </table>\n  ',
  data: function data() {
    return {
      bill_receives: []
    };
  },
  created: function created() {
    var _this = this;

    BillReceive.query().then(function (response) {
      _this.bill_receives = response.data;
    });
  },

  methods: {
    changeDoneBillReceive: function changeDoneBillReceive(bill_receive) {
      if (confirm('Deseja alterar a situação dessa conta?')) {
        BillReceive.update({ id: bill_receive.id }, bill_receive);
      }
    },
    destroyBillReceive: function destroyBillReceive(bill_receive) {
      var _this2 = this;

      if (confirm('Deseja excluir essa conta?')) {
        BillReceive.delete({ id: bill_receive.id }).then(function (response) {
          _this2.bill_receives.$remove(bill_receive);
        });
      }
    }
  },
  computed: {
    status: function status() {
      var done = 0;

      for (var i in this.bill_receives) {
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