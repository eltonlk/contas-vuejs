window.mainComponent = Vue.extend({
  data () {
    return {
      bill_receives: [
        { date_due: '19/08/2016', name: 'Conta de luz'     , value: 175.98, done: false },
        { date_due: '20/08/2016', name: 'Festas'           , value: 250.40, done: true  },
        { date_due: '22/08/2016', name: 'Supermercado'     , value: 550.00, done: false },
        { date_due: '24/08/2016', name: 'Conta de telefone', value: 75.45 , done: false },
        { date_due: '24/08/2016', name: 'Cartão de crédito', value: 800.36, done: false },
        { date_due: '24/08/2016', name: 'Empréstimo'       , value: 277.12, done: true  },
        { date_due: '26/08/2016', name: 'Gasolina'         , value: 189.32, done: true  }
      ],
      menus: [
        { text: 'Dashboard'       , routeName: 'dashboard'    },
        { text: 'Contas a pagar'  , routeName: 'bill-pay'     },
        { text: 'Contas a receber', routeName: 'bill-receive' }
      ]
    };
  },
  template: `
    <nav>
      <ul>
        <li v-for="menu in menus">
          <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>
        </li>
      </ul>
    </nav>

    <router-view></router-view>
  `
});
