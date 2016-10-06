"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Vue.filter('billPayDoneLabel', function (done) {
  return done ? "Paga" : "Não Paga";
});

Vue.filter('billPaysStatusLabel', function (status) {
  if (status.count === 0) {
    return "Nenhuma conta cadastrada.";
  } else if (status.pending === 0) {
    return "Nenhuma conta a pagar";
  } else {
    return "Existem " + status.pending + " contas a serem pagas";
  }
});

Vue.filter('billReceiveDoneLabel', function (done) {
  return done ? "Recebido" : "Não Recebido";
});

Vue.filter('billReceivesStatusLabel', function (status) {
  if (status.count === 0) {
    return "Nenhuma conta cadastrada.";
  } else if (status.pending === 0) {
    return "Nenhuma conta a cobrar";
  } else {
    return "Existem " + status.pending + " contas a serem cobradas";
  }
});

var numberToCurrency = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigitis: 2,
  maximumFractionDigitis: 2,
  style: 'currency',
  currency: 'BRL'
});

Vue.filter('numberToCurrency', {
  read: function read(value) {
    var number = 0;

    if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
      number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || 0;
    }

    return numberToCurrency.format(number);
  },
  write: function write(value) {
    var number = 0;

    if (value.length > 0) {
      number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');

      number = isNaN(number) ? 0 : parseFloat(number);
    }

    return number;
  }
});