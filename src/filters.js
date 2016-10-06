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
