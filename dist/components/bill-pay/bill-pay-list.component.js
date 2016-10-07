'use strict';

window.billPayListComponent = Vue.extend({
  template: '\n    <div class="container">\n      <p :class="{ \'grey-text\': status.count === 0, \'red-text\': status.pending > 0, \'green-text\': status.count > 0 && status.pending === 0 }">\n        {{ status | billPaysStatusLabel }}\n      </p>\n\n      <table class="bordered striped responsive-table">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th>Vencimento</th>\n            <th>Nome</th>\n            <th>Valor</th>\n            <th>Situação</th>\n            <th>Ações</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="(index, bill_pay) in bill_pays">\n            <td>{{ index + 1 }}</td>\n            <td>{{ bill_pay.date_due | dateLocalize }}</td>\n            <td>{{ bill_pay.name | upcase }}</td>\n            <td>{{ bill_pay.value | numberToCurrency }}</td>\n            <td>\n              <input id="done_{{ bill_pay.id }}" type="checkbox" v-model="bill_pay.done" @change="changeDoneBillPay(bill_pay)"/>\n              <label for="done_{{ bill_pay.id }}">{{ bill_pay.done | billPayDoneLabel }}<label>\n            </td>\n            <td>\n              <a v-link="{ name: \'bill-pay.update\', params: { id: bill_pay.id } }">Editar</a> |\n              <a href="#" @click.prevent="destroyBillPay(bill_pay)" class="destroy">Excluir</a>\n            </td>\n          </tr>\n        </thead>\n      </table>\n    </div>\n  ',
  data: function data() {
    return {
      bill_pays: []
    };
  },
  created: function created() {
    var _this = this;

    BillPay.query().then(function (response) {
      _this.bill_pays = response.data;
    });
  },

  methods: {
    changeDoneBillPay: function changeDoneBillPay(bill_pay) {
      if (confirm('Deseja alterar a situação dessa conta?')) {
        BillPay.update({ id: bill_pay.id }, bill_pay);
      }
    },
    destroyBillPay: function destroyBillPay(bill_pay) {
      var _this2 = this;

      if (confirm('Deseja excluir essa conta?')) {
        BillPay.delete({ id: bill_pay.id }).then(function (response) {
          _this2.bill_pays.$remove(bill_pay);
        });
      }
    }
  },
  computed: {
    status: function status() {
      var done = 0;

      for (var i in this.bill_pays) {
        if (this.bill_pays[i].done) {
          done++;
        }
      }

      return {
        count: this.bill_pays.length,
        pending: this.bill_pays.length - done
      };
    }
  }
});