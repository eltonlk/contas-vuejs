var router = new VueRouter();

router.map({
  '/bill-pays': {
    name: 'bill-pay',
    component: billPayComponent,
    subRoutes: {
      '/': {
        name: 'bill-pay.list',
        component: billPayListComponent
      },
      '/create': {
        name: 'bill-pay.create',
        component: billPayCreateComponent
      },
      '/:index/update': {
        name: 'bill-pay.update',
        component: billPayCreateComponent
      }
    }
  },
  '/bill-receives': {
    name: 'bill-receive',
    component: billReceiveComponent
  },
  '*': {
    component: billPayListComponent
  }
});

router.redirect({
  '*': '/bill-pays'
});

router.start({
  components: {
    'main-component': mainComponent
  }
}, '#app');
