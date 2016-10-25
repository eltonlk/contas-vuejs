'use strict';

window.billReceiveListComponent = Vue.extend({
  components: {
    'modal': modalComponent
  },
  template: '\n    <div class="container">\n      <p :class="{ \'grey-text\': status.count === 0, \'red-text\': status.pending > 0, \'green-text\': status.count > 0 && status.pending === 0 }">\n        {{ status | billReceivesStatusLabel }}\n      </p>\n\n      <table class="bordered striped responsive-table z-depth-1">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th>Vencimento</th>\n            <th>Nome</th>\n            <th>Valor</th>\n            <th>Situa\xE7\xE3o</th>\n            <th>A\xE7\xF5es</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="(index, bill_receive) in bill_receives">\n            <td>{{ index + 1 }}</td>\n            <td>{{ bill_receive.date_due | dateLocalize \'ko-KR\' }}</td>\n            <td>{{ bill_receive.name | upcase }}</td>\n            <td>{{ bill_receive.value | numberToCurrency \'pt-BR\' }}</td>\n            <td>\n              <input id="done_{{ bill_receive.id }}" type="checkbox" v-model="bill_receive.done" @change="changeDoneBillReceive(bill_receive)"/>\n              <label for="done_{{ bill_receive.id }}">{{ bill_receive.done | billReceiveDoneLabel }}<label>\n            </td>\n            <td>\n              <a v-link="{ name: \'bill-receive.update\', params: { id: bill_receive.id } }">Editar</a> |\n              <a href="#" @click.prevent="openModalDelete(bill_receive)" class="destroy">Excluir</a>\n            </td>\n          </tr>\n        </thead>\n      </table>\n    </div>\n    <modal :modal="modal">\n      <div slot="content">\n        <h4>Mensagem de confirma\xE7\xE3o</h4>\n        <p><strong>Deseja excluir esta conta?</strong></p>\n        <div class="divider"></div>\n        <p>Nome: <strong>{{ billToDelete.name | upcase }}</strong></p>\n        <p>Valor: <strong>{{ billToDelete.value | numberToCurrency \'pt-BR\' }}</strong></p>\n        <p>Data de vencimento: <strong>{{ billToDelete.date_due | dateLocalize \'ko-KR\' }}</strong></p>\n        <div class="divider"></div>\n      </div>\n      <div slot="footer">\n        <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="destroyBillReceive()">OK</button>\n        <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n      </div>\n    </modal>\n  ',
  data: function data() {
    return {
      bill_receives: [],
      billToDelete: null,
      modal: {
        id: 'modal-delete'
      }
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
    destroyBillReceive: function destroyBillReceive() {
      var _this2 = this;

      BillReceive.delete({ id: this.billToDelete.id }).then(function (response) {
        _this2.bill_receives.$remove(_this2.billToDelete);

        Materialize.toast('Conta excluída com sucesso!', 4000);
      });
    },
    openModalDelete: function openModalDelete(bill_receive) {
      this.billToDelete = bill_receive;

      $('#modal-delete').openModal();
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