window.menuComponent = Vue.extend({
  template: `
    <nav>
      <ul>
        <li v-for="menu in menus">
          <a href="#" @click.prevent="showView(menu.id)">{{ menu.text }}</a>
        </li>
      </ul>
    </nav>
  `,
  data: function () {
    return {
      menus: [
        { id: 0, text: 'Listar contas' },
        { id: 1, text: 'Criar conta' }
      ]
    };
  },
  methods: {
    showView: function (id) {
      this.$dispatch('change-activedview', id);

      if (id == 1) {
        this.$dispatch('change-formaction', 'create');

        this.$dispatch('change-bill', {
          date_due: '',
          name: '',
          value: 0,
          done: false
        });
      }
    }
  }
});
