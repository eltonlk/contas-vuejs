const dateLocalize = new Intl.DateTimeFormat('pt-BR');

const numberToCurrency = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigitis: 2,
  maximumFractionDigitis: 2,
  style: 'currency',
  currency: 'BRL'
});
