import BillPayMenuComponent from "./bill-pay-menu.component";

export default {
    components: {
        "bill-pay-menu-component": BillPayMenuComponent
    },
    template: `
        <div class="section">
            <div class="container">
                <h1>{{ title }}</h1>

                <bill-pay-menu-component></bill-pay-menu-component>
            </div>
        </div>

        <router-view></router-view>
    `,
    data () {
        return {
            title: "Contas a Pagar"
        };
    }
};
