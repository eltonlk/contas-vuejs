window.billReceiveComponent = Vue.extend({
  components: {
    'bill-receive-menu-component': billReceiveMenuComponent
  },
  template: `
    <h1>{{ title }}</h1>

    <bill-receive-menu-component></bill-receive-menu-component>

    <router-view></router-view>
  `,
  data: function () {
    return {
      title: 'Contas a Receber'
    }
  }
});
