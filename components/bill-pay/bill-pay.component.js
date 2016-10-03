window.billPayComponent = Vue.extend({
  components: {
    'bill-pay-menu-component': billPayMenuComponent
  },
  template: `
    <h1>{{ title }}</h1>

    <bill-pay-menu-component></bill-pay-menu-component>

    <router-view></router-view>
  `,
  data: function () {
    return {
      title: 'Contas a Pagar'
    }
  }
});
