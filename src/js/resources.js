Vue.http.options.root = 'http://127.0.0.1:8000/api';

window.BillPay = Vue.resource('bills/pays{/id}', {}, {
  total: {
    method: 'GET',
    url: 'bills/pays/total'
  }
});

window.BillReceive = Vue.resource('bills/receives{/id}', {}, {
  total: {
    method: 'GET',
    url: 'bills/receives/total'
  }
});
