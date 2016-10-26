/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".app.bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* global VueRouter */

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);

	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(5), __webpack_require__(7), __webpack_require__(8), __webpack_require__(11), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16)]; (function (billPayComponent, billPayCreateComponent, billPayListComponent, billReceiveComponent, billReceiveCreateComponent, billReceiveListComponent, dashboardComponent, mainComponent) {
	    var router = new VueRouter();

	    router.map({
	        "/bill-pays": {
	            name: "bill-pay",
	            component: billPayComponent,
	            subRoutes: {
	                "/": {
	                    name: "bill-pay.list",
	                    component: billPayListComponent
	                },
	                "/create": {
	                    name: "bill-pay.create",
	                    component: billPayCreateComponent
	                },
	                "/:id/update": {
	                    name: "bill-pay.update",
	                    component: billPayCreateComponent
	                }
	            }
	        },
	        "/bill-receives": {
	            name: "bill-receive",
	            component: billReceiveComponent,
	            subRoutes: {
	                "/": {
	                    name: "bill-receive.list",
	                    component: billReceiveListComponent
	                },
	                "/create": {
	                    name: "bill-receive.create",
	                    component: billReceiveCreateComponent
	                },
	                "/:id/update": {
	                    name: "bill-receive.update",
	                    component: billReceiveCreateComponent
	                }
	            }
	        },
	        "/dashboard": {
	            name: "dashboard",
	            component: dashboardComponent
	        },
	        "*": {
	            component: dashboardComponent
	        }
	    });

	    router.redirect({
	        "*": "/dashboard"
	    });

	    router.start({
	        components: {
	            "main-component": mainComponent
	        }
	    }, "#app");
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var dateLocalize = function dateLocalize() {
	    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "pt-BR";

	    return new Intl.DateTimeFormat(locale);
	};

	var numberToCurrency = function numberToCurrency() {
	    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "pt-BR";

	    return new Intl.NumberFormat(locale, {
	        minimumFractionDigitis: 2,
	        maximumFractionDigitis: 2,
	        style: "currency",
	        currency: "BRL"
	    });
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	/* global Vue */

	Vue.filter("billPayDoneLabel", function (done) {
	    return done ? "Paga" : "Não Paga";
	});

	Vue.filter("billPaysStatusLabel", function (status) {
	    if (status.count === 0) {
	        return "Nenhuma conta cadastrada.";
	    } else if (status.pending === 0) {
	        return "Nenhuma conta a pagar";
	    } else {
	        return "Existem " + status.pending + " contas a serem pagas";
	    }
	});

	Vue.filter("billReceiveDoneLabel", function (done) {
	    return done ? "Recebido" : "Não Recebido";
	});

	Vue.filter("billReceivesStatusLabel", function (status) {
	    if (status.count === 0) {
	        return "Nenhuma conta cadastrada.";
	    } else if (status.pending === 0) {
	        return "Nenhuma conta a cobrar";
	    } else {
	        return "Existem " + status.pending + " contas a serem cobradas";
	    }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/* global Vue */

	Vue.http.options.root = "http://127.0.0.1:8000/api";

	window.BillPay = Vue.resource("bills/pays{/id}", {}, {
	    total: {
	        method: "GET",
	        url: "bills/pays/total"
	    }
	});

	window.BillReceive = Vue.resource("bills/receives{/id}", {}, {
	    total: {
	        method: "GET",
	        url: "bills/receives/total"
	    }
	});

/***/ },
/* 4 */
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

/***/ }
/******/ ]);