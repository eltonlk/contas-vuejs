window.billCreateComponent = Vue.extend({
  template: `
    <form name="form" @submit.prevent="submit">
      <label>Vencimento:<label>
      <input type="text" v-model="bill.date_due"/>
      <br/><br/>
      <label>Nome:<label>
      <select v-model="bill.name">
        <option v-for="name in names" :value="name">{{ name }}</option>
      </select>
      <br/><br/>
      <label>Valor:<label>
      <input type="text" v-model="bill.value"/>
      <br/><br/>
      <label>Situação:<label>
      <span :class="{'done': bill.done, 'pending': !bill.done}">
        {{ bill.done | doneLabel }}
      </span>
      <br/><br/>
      <input type="submit" value="Gravar"/>
    </form>
  `,
  data: function () {
    return {
      action: 'create',
      bill: {
        date_due: '',
        name: '',
        value: 0,
        done: false
      },
      names: [
        'Conta de luz',
        'Conta de água',
        'Conta de telefone',
        'Supermercado',
        'Cartão de crédito',
        'Empréstimo',
        'Gasolina'
      ]
    }
  },
  methods: {
    submit: function () {
      if (this.action == 'create') {
        this.$root.$children[0].bills.push(this.bill);
      }

      this.resetBill();

      this.$router.go({ name: 'bill.list' });
    },
    resetBill: function () {
      this.bill = {
        date_due: '',
        name: '',
        value: 0,
        done: false
      };
    }
  },
  events: {
    'change-bill': function (bill) {
      this.bill = bill;
    }
  }
});
