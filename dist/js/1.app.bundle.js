webpackJsonp([1],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var billPayMenuComponent = __webpack_require__(29);

	module.exports = {
	    components: {
	        "bill-pay-menu-component": billPayMenuComponent
	    },
	    template: "\n        <div class=\"section\">\n            <div class=\"container\">\n                <h1>{{ title }}</h1>\n\n                <bill-pay-menu-component></bill-pay-menu-component>\n            </div>\n        </div>\n\n        <router-view></router-view>\n    ",
	    data: function data() {
	        return {
	            title: "Contas a Pagar"
	        };
	    }
	};

/***/ },

/***/ 29:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    template: "\n        <a class=\"waves-effect waves-light btn\" v-link=\"{ name: 'bill-pay.create' }\">\n            <i class=\"material-icons left\">add</i>Adicionar\n        </a>\n\n        <a class=\"waves-effect waves-light btn grey\" v-link=\"{ name: 'bill-pay.list' }\">\n            <i class=\"material-icons left\">view_list</i>Listar\n        </a>\n    "
	};

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* global BillPay, Materialize */

	var payNames = ["CONTA DE LUZ", "CONTA DE ÁGUA", "CONTA DE TELEFONE", "SUPERMERCADO", "CARTÃO DE CRÉDITO", "EMPRÉSTIMO", "GASOLINA"];

	var Bill = __webpack_require__(37);

	module.exports = {
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
	};

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* global BillPay, Materialize */

	var confirmBillDestroyComponent = __webpack_require__(32);

	module.exports = {
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
	};

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var modalComponent = __webpack_require__(33);

	module.exports = {
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
	};

/***/ },

/***/ 33:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    data: function data() {
	        return {
	            modal: {
	                id: ""
	            }
	        };
	    },

	    props: ["modal"],
	    template: "\n        <div :id=\"modal.id\" class=\"modal\">\n            <div class=\"modal-content\">\n                <slot name=\"content\"></slot>\n            </div>\n            <div class=\"modal-footer\">\n                <slot name=\"footer\"></slot>\n            </div>\n        </div>\n    "
	};

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var billReceiveMenuComponent = __webpack_require__(35);

	module.exports = {
	    components: {
	        "bill-receive-menu-component": billReceiveMenuComponent
	    },
	    template: "\n        <div class=\"section\">\n            <div class=\"container\">\n                <h1>{{ title }}</h1>\n\n                <bill-receive-menu-component></bill-receive-menu-component>\n            </div>\n        </div>\n\n        <router-view></router-view>\n    ",
	    data: function data() {
	        return {
	            title: "Contas a Receber"
	        };
	    }
	};

/***/ },

/***/ 35:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    template: "\n        <a class=\"waves-effect waves-light btn\" v-link=\"{ name: 'bill-receive.create' }\">\n            <i class=\"material-icons left\">add</i>Adicionar\n        </a>\n\n        <a class=\"waves-effect waves-light btn grey\" v-link=\"{ name: 'bill-receive.list' }\">\n            <i class=\"material-icons left\">view_list</i>Listar\n        </a>\n    "
	};

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* global BillReceive, Materialize */

	var receiveNames = ["SALÁRIO", "SERVIÇOS", "13º SALAÁRIO", "FÉRIAS"];

	var Bill = __webpack_require__(37);

	module.exports = {
	    template: "\n        <div class=\"container\">\n            <form @submit.prevent=\"submit\">\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <input id=\"date_due\" type=\"text\" v-model=\"bill_receive.date_due | dateLocalize\">\n                        <label for=\"date_due\" class=\"active\">Vencimento</label>\n                    </div>\n\n                    <div class=\"input-field col s6\">\n                        <input id=\"value\" type=\"text\" v-model=\"bill_receive.value | numberToCurrency\">\n                        <label for=\"value\" class=\"active\">Valor</label>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <select class=\"browser-default\" v-model=\"bill_receive.name | upcase\">\n                            <option v-for=\"name in names\" :value=\"name\">{{ name }}</option>\n                        </select>\n                        <label for=\"name\" class=\"active\">Nome</label>\n                    </div>\n\n                    <div class=\"input-field col s6\">\n                        <input type=\"checkbox\" class=\"filled-in\" id=\"done\" v-model=\"bill_receive.done\"/>\n                        <label for=\"done\">Pago</label>\n                    </div>\n                </div>\n\n                <button class=\"btn waves-effect waves-light\" type=\"submit\">\n                    {{ action == 'create' ? 'Adicionar' : 'Alterar' }}\n                </button>\n            </form>\n        </div>\n    ",
	    data: function data() {
	        return {
	            action: "create",
	            bill_receive: new Bill(),
	            names: receiveNames
	        };
	    },
	    created: function created() {
	        if (this.$route.name === "bill-receive.update") {
	            this.action = "update";
	            this.getBillReceive(this.$route.params.id);
	        }
	    },

	    methods: {
	        submit: function submit() {
	            var _this = this;

	            if (this.action === "create") {
	                BillReceive.save({}, this.bill_receive.toJSON()).then(function () {
	                    _this.$router.go({ name: "bill-receive.list" });

	                    Materialize.toast("Conta criada com sucesso!", 4000);
	                });
	            } else {
	                BillReceive.update({ id: this.bill_receive.id }, this.bill_receive.toJSON()).then(function () {
	                    _this.$router.go({ name: "bill-receive.list" });

	                    Materialize.toast("Conta atualizada com sucesso!", 4000);
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
	};

/***/ },

/***/ 37:
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bill = function () {
	    function Bill() {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Bill);

	        this.date_due = "";
	        this.name = "";
	        this.value = 0;
	        this.done = false;

	        Object.assign(this, data);
	    }

	    _createClass(Bill, [{
	        key: "toJSON",
	        value: function toJSON() {
	            return {
	                date_due: this.date_due,
	                name: this.name,
	                value: this.value,
	                done: this.done
	            };
	        }
	    }]);

	    return Bill;
	}();

	module.exports = Bill;

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* global BillReceive, Materialize */

	var confirmBillDestroyComponent = __webpack_require__(32);

	module.exports = {
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
	};

/***/ },

/***/ 39:
/***/ function(module, exports) {

	"use strict";

	/* global BillPay, BillReceive */

	module.exports = {
	    template: "\n        <div class=\"container\">\n            <div class=\"section\">\n                <h1>{{ title }}</h1>\n            <div>\n\n            <div class=\"row\">\n                <div class=\"col s12 m4\">\n                    <ul class=\"collection with-header\">\n                        <li class=\"collection-header\">\n                            <h5>Contas</h5>\n                        </li>\n                        <li class=\"collection-item\">\n                            Receber\n                            <span class=\"badge green-text\">{{ totalReceives | numberToCurrency }}</span>\n                        </li>\n                        <li class=\"collection-item\">\n                            Pagar\n                            <span class=\"badge red-text\">{{ totalPays | numberToCurrency }}</span>\n                        </li>\n                        <li class=\"collection-item\">\n                            <strong>\n                                Total\n                                <span class=\"badge\">{{ totalReceives - totalPays | numberToCurrency }}</span>\n                            </strong>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
	    data: function data() {
	        return {
	            title: "Dashboard",
	            totalPays: 0,
	            totalReceives: 0
	        };
	    },
	    created: function created() {
	        var _this = this;

	        BillPay.total().then(function (response) {
	            _this.totalPays = response.data.total;
	        });

	        BillReceive.total().then(function (response) {
	            _this.totalReceives = response.data.total;
	        });
	    }
	};

/***/ },

/***/ 40:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    created: function created() {
	        $(document).ready(function () {
	            $(".button-collapse").sideNav({ closeOnClick: true });
	        });
	    },
	    data: function data() {
	        return {
	            menus: [{ text: "Dashboard", routeName: "dashboard" }, { text: "Contas a pagar", routeName: "bill-pay" }, { text: "Contas a receber", routeName: "bill-receive" }]
	        };
	    },

	    template: "\n        <div class=\"navbar-fixed\">\n            <nav>\n                <div class=\"nav-wrapper container\">\n                    <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\">\n                        <i class=\"material-icons\">menu</i>\n                    </a>\n\n                    <a href=\"#\" class=\"brand-logo\">Contas</a>\n\n                    <ul class=\"right hide-on-med-and-down\">\n                        <li v-for=\"menu in menus\">\n                            <a v-link=\"{ name: menu.routeName }\">{{ menu.text }}</a>\n                        </li>\n                    </ul>\n\n                    <ul id=\"nav-mobile\" class=\"side-nav\">\n                        <li v-for=\"menu in menus\">\n                            <a v-link=\"{ name: menu.routeName }\">{{ menu.text }}</a>\n                        </li>\n                    </ul>\n                </div>\n            </nav>\n        </div>\n        <router-view></router-view>\n    "
	};

/***/ }

});