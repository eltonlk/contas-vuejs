window.billReceiveCreateComponent = Vue.extend({
  template: `
    <form name="form" @submit.prevent="submit">
      <label>Vencimento:<label>
      <input type="text" v-model="bill_receive.date_due"/>
      <br/><br/>
      <label>Nome:<label>
      <select v-model="bill_receive.name">
        <option v-for="name in names" :value="name">{{ name }}</option>
      </select>
      <br/><br/>
      <label>Valor:<label>
      <input type="text" v-model="bill_receive.value"/>
      <br/><br/>
      <label>Situação:<label>
      <span :class="{'done': bill_receive.done, 'pending': !bill_receive.done}">
        {{ bill_receive.done | billReceiveDoneLabel }}
      </span>
      <br/><br/>
      <input type="submit" value="{{ action == 'create' ? 'Adicionar' : 'Alterar' }}"/>
    </form>
  `,
  data: function () {
    return {
      action: 'create',
      bill_receive: {
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
  created: function () {
    if (this.$route.name == 'bill-pay.update') {
      this.action = 'update';
      this.getBillReceive(this.$route.params.index);
    }
  },
  methods: {
    submit: function () {
      if (this.action == 'create') {
        this.$root.$children[0].bill_receives.push(this.bill_receive);
      }

      this.resetBillReceive();

      this.$router.go({ name: 'bill-receive.list' });
    },
    getBillReceive: function (index) {
      this.bill_receive = this.$root.$children[0].bill_receives[index];
    },
    resetBillReceive: function () {
      this.bill_receive = {
        date_due: '',
        name: '',
        value: 0,
        done: false
      };
    }
  }
});
