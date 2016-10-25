"use strict";

/* global Vue, confirmBillDestroyComponent, BillReceive, Materialize */

window.billReceiveListComponent = Vue.extend({
    components: {
        "confirm-bill-destroy": confirmBillDestroyComponent
    },
    template: "\n        <div class=\"container\">\n            <p :class=\"{ 'grey-text': status.count === 0, 'red-text': status.pending > 0, 'green-text': status.count > 0 && status.pending === 0 }\">\n                {{ status | billReceivesStatusLabel }}\n            </p>\n\n            <table class=\"bordered striped responsive-table z-depth-1\">\n                <thead>\n                    <tr>\n                        <th>#</th>\n                        <th>Vencimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Situa\xE7\xE3o</th>\n                        <th>A\xE7\xF5es</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"(index, bill_receive) in bill_receives\">\n                        <td>{{ index + 1 }}</td>\n                        <td>{{ bill_receive.date_due | dateLocalize 'ko-KR' }}</td>\n                        <td>{{ bill_receive.name | upcase }}</td>\n                        <td>{{ bill_receive.value | numberToCurrency 'pt-BR' }}</td>\n                        <td>\n                            <input id=\"done_{{ bill_receive.id }}\" type=\"checkbox\" v-model=\"bill_receive.done\" @change=\"changeDoneBillReceive(bill_receive)\"/>\n                            <label for=\"done_{{ bill_receive.id }}\">{{ bill_receive.done | billReceiveDoneLabel }}<label>\n                        </td>\n                        <td>\n                            <a v-link=\"{ name: 'bill-receive.update', params: { id: bill_receive.id } }\">Editar</a> |\n                            <a href=\"#\" @click.prevent=\"openModalDestroy(bill_receive)\" class=\"destroy\">Excluir</a>\n                        </td>\n                    </tr>\n                </body>\n            </table>\n        </div>\n        <confirm-bill-destroy :bill=\"billToDestroy\"></confirm-bill-destroy>\n    ",
    data: function data() {
        return {
            bill_receives: [],
            billToDestroy: null
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
            if (confirm("Deseja alterar a situação dessa conta?")) {
                BillReceive.update({ id: bill_receive.id }, bill_receive);
            }
        },
        openModalDestroy: function openModalDestroy(bill_receive) {
            this.billToDestroy = bill_receive;

            $("#confirm-bill-destroy").openModal();
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
    },
    events: {
        "destroy-bill": function destroyBill(bill) {
            var _this2 = this;

            BillReceive.delete({ id: bill.id }).then(function () {
                _this2.bill_receives.$remove(bill);

                Materialize.toast("Conta excluída com sucesso!", 4000);
            });
        }
    }
});