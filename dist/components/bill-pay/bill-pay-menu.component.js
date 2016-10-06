'use strict';

window.billPayMenuComponent = Vue.extend({
  template: '\n    <nav>\n      <ul>\n        <li v-for="menu in menus">\n          <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>\n        </li>\n      </ul>\n    </nav>\n  ',
  data: function data() {
    return {
      menus: [{ text: 'Listar contas', routeName: 'bill-pay.list' }, { text: 'Criar conta', routeName: 'bill-pay.create' }]
    };
  }
});