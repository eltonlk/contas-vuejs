"use strict";

/* global Vue */

window.billReceiveMenuComponent = Vue.extend({
    template: "\n        <a class=\"waves-effect waves-light btn\" v-link=\"{ name: 'bill-receive.create' }\">\n            <i class=\"material-icons left\">add</i>Adicionar\n        </a>\n\n        <a class=\"waves-effect waves-light btn grey\" v-link=\"{ name: 'bill-receive.list' }\">\n            <i class=\"material-icons left\">view_list</i>Listar\n        </a>\n    "
});