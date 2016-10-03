window.menuComponent = Vue.extend({
  template: `
    <nav>
      <ul>
        <li v-for="menu in menus">
          <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>
        </li>
      </ul>
    </nav>
  `,
  data: function () {
    return {
      menus: [
        { text: 'Listar contas', routeName: 'bill.list'   },
        { text: 'Criar conta'  , routeName: 'bill.create' }
      ]
    };
  }
});
