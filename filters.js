Vue.filter('doneLabel', function (done) {
  return done ? "Paga" : "Não Paga";
});

Vue.filter('statusLabel', function (status) {
  if (status.count === 0) {
    return "Nenhuma conta cadastrada.";
  } else if (status.pending === 0) {
    return "Nenhuma conta a pagar";
  } else {
    return "Existem " + status.pending + " contas a serem pagas";
  }
});