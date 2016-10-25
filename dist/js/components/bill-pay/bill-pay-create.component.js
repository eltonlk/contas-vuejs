"use strict";

/* global Vue, BillPay, Bill, Materialize */

var payNames = ["CONTA DE LUZ", "CONTA DE ÁGUA", "CONTA DE TELEFONE", "SUPERMERCADO", "CARTÃO DE CRÉDITO", "EMPRÉSTIMO", "GASOLINA"];

window.billPayCreateComponent = Vue.extend({
    template: "\n        <div class=\"container\">\n            <form @submit.prevent=\"submit\">\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <input id=\"date_due\" type=\"text\" v-model=\"bill_pay.date_due | dateLocalize\">\n                        <label for=\"date_due\" class=\"active\">Vencimento</label>\n                    </div>\n\n                    <div class=\"input-field col s6\">\n                        <input id=\"value\" type=\"text\" v-model=\"bill_pay.value | numberToCurrency\">\n                        <label for=\"value\" class=\"active\">Valor</label>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <select class=\"browser-default\" v-model=\"bill_pay.name | upcase\">\n                            <option v-for=\"name in names\" :value=\"name\">{{ name }}</option>\n                        </select>\n                        <label for=\"name\" class=\"active\">Nome</label>\n                    </div>\n\n                    <div class=\"input-field col s6\">\n                        <input type=\"checkbox\" class=\"filled-in\" id=\"done\" v-model=\"bill_pay.done\"/>\n                        <label for=\"done\">Pago</label>\n                    </div>\n                </div>\n\n                <button class=\"btn waves-effect waves-light\" type=\"submit\">\n                    {{ action == 'create' ? 'Adicionar' : 'Alterar' }}\n                </button>\n            </form>\n        </div>\n    ",
    data: function data() {
        return {
            action: "create",
            bill_pay: new Bill(),
            names: payNames
        };
    },
    created: function created() {
        if (this.$route.name === "bill-pay.update") {
            this.action = "update";
            this.getBillPay(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            if (this.action === "create") {
                BillPay.save({}, this.bill_pay.toJSON()).then(function () {
                    _this.$router.go({ name: "bill-pay.list" });

                    Materialize.toast("Conta criada com sucesso!", 4000);
                });
            } else {
                BillPay.update({ id: this.bill_pay.id }, this.bill_pay.toJSON()).then(function () {
                    _this.$router.go({ name: "bill-pay.list" });

                    Materialize.toast("Conta atualizada com sucesso!", 4000);
                });
            }
        },
        getBillPay: function getBillPay(id) {
            var _this2 = this;

            BillPay.get({ id: id }).then(function (response) {
                _this2.bill_pay = new Bill(response.data);
            });
        }
    }
});