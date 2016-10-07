'use strict';

window.mainComponent = Vue.extend({
  created: function created() {
    $(document).ready(function () {
      $('.button-collapse').sideNav({ closeOnClick: true });
    });
  },
  data: function data() {
    return {
      menus: [{ text: 'Dashboard', routeName: 'dashboard' }, { text: 'Contas a pagar', routeName: 'bill-pay' }, { text: 'Contas a receber', routeName: 'bill-receive' }]
    };
  },

  template: '\n    <div class="navbar-fixed">\n      <nav>\n        <div class="nav-wrapper container">\n          <a href="#" data-activates="nav-mobile" class="button-collapse">\n            <i class="material-icons">menu</i>\n          </a>\n\n          <a href="#" class="brand-logo">Contas</a>\n\n          <ul class="right hide-on-med-and-down">\n            <li v-for="menu in menus">\n              <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>\n            </li>\n          </ul>\n\n          <ul id="nav-mobile" class="side-nav">\n            <li v-for="menu in menus">\n              <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>\n            </li>\n          </ul>\n        </div>\n      </nav>\n    </div>\n\n    <router-view></router-view>\n  '
});