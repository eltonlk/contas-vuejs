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
    if (this.$route.name == 'bill-receive.update') {
      this.action = 'update';
      this.getBillReceive(this.$route.params.id);
    }
  },
  methods: {
    submit: function () {
      var self = this;

      if (this.action == 'create') {
        BillReceive.save({}, this.bill_receive).then(function (response) {
          self.$router.go({ name: 'bill-receive.list' });
        });
      } else {
        BillReceive.update({ id: this.bill_receive.id }, this.bill_receive).then(function (response) {
          self.$router.go({ name: 'bill-receive.list' });
        });
      }
    },
    getBillReceive: function (id) {
      var self = this;

      BillReceive.get({ id: id }).then(function (response) {
        self.bill_receive = response.data;
      });
    }
  }
});
