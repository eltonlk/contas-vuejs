import "./bootstrap";

import VueRouter from "vue-router";

import BillPayComponent from "./components/bill-pay/BillPay.vue";
import BillPayCreateComponent from "./components/bill-pay/BillPayCreate.vue";
import BillPayListComponent from "./components/bill-pay/BillPayList.vue";
import BillReceiveComponent from "./components/bill-receive/BillReceive.vue";
import BillReceiveCreateComponent from "./components/bill-receive/BillReceiveCreate.vue";
import BillReceiveListComponent from "./components/bill-receive/BillReceiveList.vue";
import DashboardComponent from "./components/Dashboard.vue";
import MainComponent from "./components/Main.vue";

let router = new VueRouter();

router.map({
    "/bill-pays": {
        name: "bill-pay",
        component: BillPayComponent,
        subRoutes: {
            "/": {
                name: "bill-pay.list",
                component: BillPayListComponent
            },
            "/create": {
                name: "bill-pay.create",
                component: BillPayCreateComponent
            },
            "/:id/update": {
                name: "bill-pay.update",
                component: BillPayCreateComponent
            }
        }
    },
    "/bill-receives": {
        name: "bill-receive",
        component: BillReceiveComponent,
        subRoutes: {
            "/": {
                name: "bill-receive.list",
                component: BillReceiveListComponent
            },
            "/create": {
                name: "bill-receive.create",
                component: BillReceiveCreateComponent
            },
            "/:id/update": {
                name: "bill-receive.update",
                component: BillReceiveCreateComponent
            }
        }
    },
    "/dashboard": {
        name: "dashboard",
        component: DashboardComponent
    },
    "*": {
        component: DashboardComponent
    }
});

router.redirect({
    "*": "/dashboard"
});

router.start({
    components: {
        "main-component": MainComponent
    }
}, "#app");
