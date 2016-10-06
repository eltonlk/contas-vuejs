'use strict';

var dateLocalize = new Intl.DateTimeFormat('pt-BR');

var numberToCurrency = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigitis: 2,
  maximumFractionDigitis: 2,
  style: 'currency',
  currency: 'BRL'
});