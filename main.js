// Vue.component('app-component', appComponent);
//
// var app = new Vue({
//   el: '#app'
// });
//
//
// // app.$watch('teste', function (novo, velho) {
// //   console.log('velho valor: ' + velho + ', novo valor: ' + novo);
// // });
//
// var pagina1 = Vue.extend({
//   template: 'pagina1'
// });
//
// var pagina2 = Vue.extend({
//   template: 'pagina2'
// });
//
// var app = Vue.extend({});

var router = new VueRouter();

router.map({
  '/bills': {
    component: billListComponent
  },
  '/bill/create': {
    component: billCreateComponent
  }
});

router.start({
  components: {
    'app-component': appComponent
  }
}, '#app');
