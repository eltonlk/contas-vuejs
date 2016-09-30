Vue.filter('doneLabel', function (done) {
  return done ? "Paga" : "Não Paga";
});

Vue.filter('statusLabel', function (status) {
  if (status.count == 0) {
    return "<span class=\"empty\">Nenhuma conta cadastrada.</span>";
  } else if (status.open_count == 0) {
    return "<span class=\"done\">Nenhuma conta a pagar</span>";
  } else {
    return "<span class=\"pending\">Existem " + status.open_count + " contas a serem pagas</span>";
  }
});

var app = new Vue({
  el: '#app',
  data: {
    title: 'Contas a Pagar',
    menus: [
      { id: 0, text: 'Listar contas' },
      { id: 1, text: 'Criar conta' }
    ],
    activedView: 0,
    formType: 'insert',
    bills: [
      { date_due: '20/08/2016', name: 'Conta de luz'     , value: 175.98, done: true },
      { date_due: '21/08/2016', name: 'Festas'           , value: 250.40, done: false },
      { date_due: '22/08/2016', name: 'Supermercado'     , value: 550.00, done: false },
      { date_due: '23/08/2016', name: 'Conta de telefone', value: 75.45 , done: false },
      { date_due: '24/08/2016', name: 'Cartão de crédito', value: 800.36, done: false },
      { date_due: '25/08/2016', name: 'Empréstimo'       , value: 277.12, done: false },
      { date_due: '26/08/2016', name: 'Gasolina'         , value: 189.32, done: false }
    ],
    bill: {
      date_due: '',
      name: '',
      value: 0,
      done: false
    },
    names: [
      'Conta de luz',
      'Conta de água',
      'Conta de telefone',
      'Supermercado',
      'Cartão de crédito',
      'Empréstimo',
      'Gasolina'
    ]
  },
  computed: {
    status: function () {
      var done = 0;

      for(var i in this.bills) {
        if (this.bills[i].done) {
          done++;
        }
      }

      return {
        count: this.bills.length,
        open_count: this.bills.length - done
      };
    }
  },
  methods: {
    destroyBill: function (bill) {
      if (confirm('Deseja excluir essa conta?')) {
        this.bills.$remove(bill);
      }
    },
    loadBill: function (bill) {
      this.bill = bill;
      this.formType = 'update';
      this.activedView = 1;
    },
    showView: function (id) {
      this.activedView = id;

      if (id == 1) {
        this.formType = 'insert';
      }
    },
    submit: function () {
      if (this.formType == 'insert') {
        this.bills.push(this.bill);
      }

      this.bill = {
        date_due: '',
        name: '',
        value: 0,
        done: false
      };

      this.activedView = 0;
    }
  }
});

//
// app.$watch('teste', function (novo, velho) {
//   console.log('velho valor: ' + velho + ', novo valor: ' + novo);
// });
