"use strict";

/* global Vue, BillPay, confirmBillDestroyComponent, Materialize */

window.billPayListComponent = Vue.extend({
    components: {
        "confirm-bill-destroy": confirmBillDestroyComponent
    },
    template: "\n        <div class=\"container\">\n            <p :class=\"{ 'grey-text': status.count === 0, 'red-text': status.pending > 0, 'green-text': status.count > 0 && status.pending === 0 }\">\n                {{ status | billPaysStatusLabel }}\n            </p>\n\n            <table class=\"bordered striped responsive-table z-depth-1\">\n                <thead>\n                    <tr>\n                        <th>#</th>\n                        <th>Vencimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Situa\xE7\xE3o</th>\n                        <th>A\xE7\xF5es</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"(index, bill_pay) in bill_pays\">\n                        <td>{{ index + 1 }}</td>\n                        <td>{{ bill_pay.date_due | dateLocalize }}</td>\n                        <td>{{ bill_pay.name | upcase }}</td>\n                        <td>{{ bill_pay.value | numberToCurrency }}</td>\n                        <td>\n                            <input id=\"done_{{ bill_pay.id }}\" type=\"checkbox\" v-model=\"bill_pay.done\" @change=\"changeDoneBillPay(bill_pay)\"/>\n                            <label for=\"done_{{ bill_pay.id }}\">{{ bill_pay.done | billPayDoneLabel }}<label>\n                        </td>\n                        <td>\n                            <a v-link=\"{ name: 'bill-pay.update', params: { id: bill_pay.id } }\">Editar</a> |\n                            <a href=\"#\" @click.prevent=\"openModalDestroy(bill_pay)\" class=\"destroy\">Excluir</a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <confirm-bill-destroy :bill=\"billToDestroy\"></confirm-bill-destroy>\n    ",
    data: function data() {
        return {
            bill_pays: [],
            billToDestroy: null
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
            if (confirm("Deseja alterar a situação dessa conta?")) {
                BillPay.update({ id: bill_pay.id }, bill_pay);
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
    },
    events: {
        "destroy-bill": function destroyBill(bill) {
            var _this2 = this;

            BillPay.delete({ id: bill.id }).then(function () {
                _this2.bill_pays.$remove(bill);

                Materialize.toast("Conta excluída com sucesso!", 4000);
            });
        }
    }
});