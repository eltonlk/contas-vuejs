window.billComponent = Vue.extend({
  template: `
    <nav>
      <ul>
        <li v-for="menu in menus">
          <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>
        </li>
      </ul>
    </nav>

    <router-view></router-view>
  `,
  data: function () {
    return {
      menus: [
        { text: 'Contas a pagar'  , routeName: 'bill-pay'   },
        { text: 'Contas a receber', routeName: 'bill-receive' }
      ]
    };
  }
});
