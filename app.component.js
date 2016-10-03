window.appComponent = Vue.extend({
  components: {
    'menu-component': menuComponent
  },
  template: `
    <style type="text/css">
      .destroy {
        color: red;
      }
      .empty {
        color: grey;
      }
      .pending {
        color: red;
      }
      .done {
        color: green;
      }
    </style>

    <h1>{{ title }}</h1>

    <menu-component></menu-component>

    <router-view></router-view>
  `,
  data: function () {
    return {
      title: 'Contas a Pagar'
    }
  }
});
