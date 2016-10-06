'use strict';

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
      '/:id/update': {
        name: 'bill-pay.update',
        component: billPayCreateComponent
      }
    }
  },
  '/bill-receives': {
    name: 'bill-receive',
    component: billReceiveComponent,
    subRoutes: {
      '/': {
        name: 'bill-receive.list',
        component: billReceiveListComponent
      },
      '/create': {
        name: 'bill-receive.create',
        component: billReceiveCreateComponent
      },
      '/:id/update': {
        name: 'bill-receive.update',
        component: billReceiveCreateComponent
      }
    }
  },
  '/dashboard': {
    name: 'dashboard',
    component: dashboardComponent
  },
  '*': {
    component: dashboardComponent
  }
});

router.redirect({
  '*': '/dashboard'
});

router.start({
  components: {
    'main-component': mainComponent
  }
}, '#app');