/* global Vue */

Vue.filter("billPayDoneLabel", (done) => {
    return done ? "Paga" : "Não Paga";
});

Vue.filter("billPaysStatusLabel", (status) => {
    if (status.count === 0) {
        return "Nenhuma conta cadastrada.";
    } else if (status.pending === 0) {
        return "Nenhuma conta a pagar";
    } else {
        return "Existem " + status.pending + " contas a serem pagas";
    }
});

Vue.filter("billReceiveDoneLabel", (done) => {
    return done ? "Recebido" : "Não Recebido";
});

Vue.filter("billReceivesStatusLabel", (status) => {
    if (status.count === 0) {
        return "Nenhuma conta cadastrada.";
    } else if (status.pending === 0) {
        return "Nenhuma conta a cobrar";
    } else {
        return "Existem " + status.pending + " contas a serem cobradas";
    }
});
