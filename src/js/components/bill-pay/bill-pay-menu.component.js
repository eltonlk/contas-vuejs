window.billPayMenuComponent = Vue.extend({
  template: `
    <a class="waves-effect waves-light btn" v-link="{ name: 'bill-pay.create' }">
      <i class="material-icons left">add</i>Adicionar
    </a>

    <a class="waves-effect waves-light btn grey" v-link="{ name: 'bill-pay.list' }">
      <i class="material-icons left">view_list</i>Listar
    </a>
  `
});
