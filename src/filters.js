Vue.filter('billPayDoneLabel', (done) => {
  return done ? "Paga" : "Não Paga";
});

Vue.filter('billPaysStatusLabel', (status) => {
  if (status.count === 0) {
    return "Nenhuma conta cadastrada.";
  } else if (status.pending === 0) {
    return "Nenhuma conta a pagar";
  } else {
    return "Existem " + status.pending + " contas a serem pagas";
  }
});

Vue.filter('billReceiveDoneLabel', (done) => {
  return done ? "Recebido" : "Não Recebido";
});

Vue.filter('billReceivesStatusLabel', (status) => {
  if (status.count === 0) {
    return "Nenhuma conta cadastrada.";
  } else if (status.pending === 0) {
    return "Nenhuma conta a cobrar";
  } else {
    return "Existem " + status.pending + " contas a serem cobradas";
  }
});

const numberToCurrency = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigitis: 2,
  maximumFractionDigitis: 2,
  style: 'currency',
  currency: 'BRL'
});

Vue.filter('numberToCurrency', {
  read (value) {
    let number = 0;

    if (value && typeof value !== undefined) {
      number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || 0;
    }

    return numberToCurrency.format(number);
  },
  write (value) {
    let number = 0;

    if (value.length > 0) {
      number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');

      number = isNaN(number) ? 0 : parseFloat(number);
    }

    return number;
  }
});
