/* global Vue */

Vue.http.options.root = "http://127.0.0.1:8000/api";

let BillPayResource = Vue.resource("bills/pays{/id}", {}, {
    total: {
        method: "GET",
        url: "bills/pays/total"
    }
});

let BillReceiveResource = Vue.resource("bills/receives{/id}", {}, {
    total: {
        method: "GET",
        url: "bills/receives/total"
    }
});

export {BillPayResource, BillReceiveResource};
