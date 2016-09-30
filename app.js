Vue.filter('doneLabel', function (value) {
  return value == 0 ? "Não Paga" : "Paga";
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
      { date_due: '20/08/2016', name: 'Conta de luz'     , value: 175.98, done: 1 },
      { date_due: '21/08/2016', name: 'Festas'           , value: 250.40, done: 0 },
      { date_due: '22/08/2016', name: 'Supermercado'     , value: 550.00, done: 0 },
      { date_due: '23/08/2016', name: 'Conta de telefone', value: 75.45 , done: 0 },
      { date_due: '24/08/2016', name: 'Cartão de crédito', value: 800.36, done: 0 },
      { date_due: '25/08/2016', name: 'Empréstimo'       , value: 277.12, done: 0 },
      { date_due: '26/08/2016', name: 'Gasolina'         , value: 189.32, done: 0 }
    ],
    bill: {
      date_due: '',
      name: '',
      value: 0,
      done: 0
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
      var count = 0;

      for(var i in this.bills) {
        if (!this.bills[i].done) {
          count++;
        }
      }

      return !count? "Nenhuma conta a pagar" : "Existem " + count + " contas a serem pagas";
    }
  },
  methods: {
    showView: function (id) {
      this.activedView = id;

      if (id == 1) {
        this.formType = 'insert';
      }
    },
    loadBill: function (bill) {
      this.bill = bill;
      this.formType = 'update';
      this.activedView = 1;
    },
    submit: function () {
      if (this.formType == 'insert') {
        this.bills.push(this.bill);
      }

      this.bill = {
        date_due: '',
        name: '',
        value: 0,
        done: 0
      };

      this.activedView = 0;
    }
  }
});

// app.$watch('teste', function (novo, velho) {
//   console.log('velho valor: ' + velho + ', novo valor: ' + novo);
// });
