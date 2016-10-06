'use strict';

window.billReceiveMenuComponent = Vue.extend({
  template: '\n    <nav>\n      <ul>\n        <li v-for="menu in menus">\n          <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>\n        </li>\n      </ul>\n    </nav>\n  ',
  data: function data() {
    return {
      menus: [{ text: 'Listar contas', routeName: 'bill-receive.list' }, { text: 'Criar conta', routeName: 'bill-receive.create' }]
    };
  }
});