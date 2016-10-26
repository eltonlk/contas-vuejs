/* global VueRouter */

require("./helper_functions");
require("./filters");
require("./resources");
require("./bill");

require([
    "./components/bill-pay/bill-pay.component",
    "./components/bill-pay/bill-pay-create.component",
    "./components/bill-pay/bill-pay-list.component",
    "./components/bill-receive/bill-receive.component",
    "./components/bill-receive/bill-receive-create.component",
    "./components/bill-receive/bill-receive-list.component",
    "./components/dashboard.component",
    "./components/main.component"
], function (
    billPayComponent,
    billPayCreateComponent,
    billPayListComponent,
    billReceiveComponent,
    billReceiveCreateComponent,
    billReceiveListComponent,
    dashboardComponent,
    mainComponent
) {
    let router = new VueRouter();

    router.map({
        "/bill-pays": {
            name: "bill-pay",
            component: billPayComponent,
            subRoutes: {
                "/": {
                    name: "bill-pay.list",
                    component: billPayListComponent
                },
                "/create": {
                    name: "bill-pay.create",
                    component: billPayCreateComponent
                },
                "/:id/update": {
                    name: "bill-pay.update",
                    component: billPayCreateComponent
                }
            }
        },
        "/bill-receives": {
            name: "bill-receive",
            component: billReceiveComponent,
            subRoutes: {
                "/": {
                    name: "bill-receive.list",
                    component: billReceiveListComponent
                },
                "/create": {
                    name: "bill-receive.create",
                    component: billReceiveCreateComponent
                },
                "/:id/update": {
                    name: "bill-receive.update",
                    component: billReceiveCreateComponent
                }
            }
        },
        "/dashboard": {
            name: "dashboard",
            component: dashboardComponent
        },
        "*": {
            component: dashboardComponent
        }
    });

    router.redirect({
        "*": "/dashboard"
    });

    router.start({
        components: {
            "main-component": mainComponent
        }
    }, "#app");
});
