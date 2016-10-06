window.billPayMenuComponent = Vue.extend({
  template: `
    <nav>
      <ul>
        <li v-for="menu in menus">
          <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>
        </li>
      </ul>
    </nav>
  `,
  data () {
    return {
      menus: [
        { text: 'Listar contas', routeName: 'bill-pay.list'   },
        { text: 'Criar conta'  , routeName: 'bill-pay.create' }
      ]
    };
  }
});
