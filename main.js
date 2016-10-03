var router = new VueRouter();

router.map({
  '/bills': {
    name: 'bill.list',
    component: billListComponent
  },
  '/bill/create': {
    name: 'bill.create',
    component: billCreateComponent
  },
  '*': {
    component: billListComponent
  }
});

router.redirect({
  '*': '/bills'
});

router.start({
  components: {
    'main-component': mainComponent
  }
}, '#app');
