Vue.filter('doneLabel', function (done) {
  return done ? "Paga" : "Não Paga";
});

Vue.filter('statusLabel', function (status) {
  if (status.count === 0) {
    return "Nenhuma conta cadastrada.";
  } else if (status.pending === 0) {
    return "Nenhuma conta a pagar";
  } else {
    return "Existem " + status.pending + " contas a serem pagas";
  }
});

var menuComponent = Vue.extend({
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
      this.$parent.activedView = id;

      if (id == 1) {
        this.$parent.formType = 'insert';
      }
    }
  }
});

Vue.component('menu-component', menuComponent);

var billListComponent = Vue.extend({
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

    <p :class="{ 'empty': status.count === 0, 'pending': status.pending > 0, 'done': status.count > 0 && status.pending === 0 }">
      {{ status | statusLabel }}
    </p>

    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>#</th>
          <th>Vencimento</th>
          <th>Nome</th>
          <th>Valor</th>
          <th>Situação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, bill) in bills">
          <td>{{ index + 1 }}</td>
          <td>{{ bill.date_due }}</td>
          <td>{{ bill.name }}</td>
          <td>{{ bill.value | currency 'R$ ' }}</td>
          <td :class="{'done': bill.done, 'pending': !bill.done}">
            <label>
              <input type="checkbox" v-model="bill.done"/>
              {{ bill.done | doneLabel }}
            <label>
          </td>
          <td>
            <a href="#" @click.prevent="loadBill(bill)">Editar</a> |
            <a href="#" @click.prevent="destroyBill(bill)" class="destroy">Excluir</a>
          </td>
        </tr>
      </thead>
    </table>
  `,
  data: function () {
    return {
      bills: [
        { date_due: '20/08/2016', name: 'Conta de luz'     , value: 175.98, done: true },
        { date_due: '21/08/2016', name: 'Festas'           , value: 250.40, done: false },
        { date_due: '22/08/2016', name: 'Supermercado'     , value: 550.00, done: false },
        { date_due: '23/08/2016', name: 'Conta de telefone', value: 75.45 , done: false },
        { date_due: '24/08/2016', name: 'Cartão de crédito', value: 800.36, done: false },
        { date_due: '25/08/2016', name: 'Empréstimo'       , value: 277.12, done: false },
        { date_due: '26/08/2016', name: 'Gasolina'         , value: 189.32, done: false }
      ]
    };
  },
  methods: {
    destroyBill: function (bill) {
      if (confirm('Deseja excluir essa conta?')) {
        this.bills.$remove(bill);
      }
    },
    loadBill: function (bill) {
      this.$parent.bill = bill;
      this.$parent.formType = 'update';
      this.$parent.activedView = 1;
    }
  },
  computed: {
    status: function () {
      var done = 0;

      for(var i in this.bills) {
        if (this.bills[i].done) {
          done++;
        }
      }

      return {
        count: this.bills.length,
        pending: this.bills.length - done
      };
    }
  }
});

Vue.component('bill-list-component', billListComponent);

var appComponent = Vue.extend({
  template: `
    <h1>{{ title }}</h1>

    <menu-component></menu-component>

    <div v-if="activedView == 0">
      <bill-list-component></bill-list-component>
    </div>

    <div v-if="activedView == 1">
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
        <input type="submit" value="Enviar"/>
      </form>
    </div>
  `,
  data: function () {
    return {
      title: 'Contas a Pagar',
      activedView: 0,
      formType: 'insert',
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
      if (this.formType == 'insert') {
        this.bills.push(this.bill);
      }

      this.bill = {
        date_due: '',
        name: '',
        value: 0,
        done: false
      };

      this.activedView = 0;
    }
  }
});

Vue.component('app-component', appComponent);

var app = new Vue({
  el: '#app'
});

//
// app.$watch('teste', function (novo, velho) {
//   console.log('velho valor: ' + velho + ', novo valor: ' + novo);
// });
