window.mainComponent = Vue.extend({
  components: {
    'bill-component': billComponent
  },
  data: function () {
    return {
      bills: [
        { date_due: '20/08/2016', name: 'Conta de luz'     , value: 175.98, done: true  },
        { date_due: '21/08/2016', name: 'Festas'           , value: 250.40, done: false },
        { date_due: '22/08/2016', name: 'Supermercado'     , value: 550.00, done: false },
        { date_due: '23/08/2016', name: 'Conta de telefone', value: 75.45 , done: false },
        { date_due: '24/08/2016', name: 'Cartão de crédito', value: 800.36, done: false },
        { date_due: '25/08/2016', name: 'Empréstimo'       , value: 277.12, done: false },
        { date_due: '26/08/2016', name: 'Gasolina'         , value: 189.32, done: false }
      ]
    };
  },
  template: `
    <bill-component></bill-component>
  `
});
