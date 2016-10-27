import "./bootstrap";

import VueRouter from "vue-router";

import BillPayComponent from "./components/bill-pay/bill-pay.component";
import BillPayCreateComponent from "./components/bill-pay/bill-pay-create.component";
import BillPayListComponent from "./components/bill-pay/bill-pay-list.component";
import BillReceiveComponent from "./components/bill-receive/bill-receive.component";
import BillReceiveCreateComponent from "./components/bill-receive/bill-receive-create.component";
import BillReceiveListComponent from "./components/bill-receive/bill-receive-list.component";
import DashboardComponent from "./components/dashboard.component";
import MainComponent from "./components/main.component";

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
