"use strict";

/* global Vue, modalComponent */

window.confirmBillDestroyComponent = Vue.extend({
    components: {
        "modal": modalComponent
    },
    data: function data() {
        return {
            modal: {
                id: "confirm-bill-destroy"
            }
        };
    },

    methods: {
        confirm: function confirm() {
            this.$dispatch("destroy-bill", this.bill);
        }
    },
    props: ["bill"],
    template: "\n        <modal :modal=\"modal\">\n            <div slot=\"content\">\n                <h5 class=\"center-align\">Deseja excluir esta conta?</h5>\n                <div class=\"divider\"></div>\n                <p>Nome: <strong>{{ bill.name | upcase }}</strong></p>\n                <p>Valor: <strong>{{ bill.value | numberToCurrency 'pt-BR' }}</strong></p>\n                <p>Data de vencimento: <strong>{{ bill.date_due | dateLocalize 'ko-KR' }}</strong></p>\n            </div>\n            <div slot=\"footer\">\n                <button class=\"btn btn-flat waves-effect modal-close modal-action\" @click=\"confirm()\">OK</button>\n                <button class=\"btn btn-flat waves-effect modal-close modal-action\">Cancelar</button>\n            </div>\n        </modal>\n    "
});