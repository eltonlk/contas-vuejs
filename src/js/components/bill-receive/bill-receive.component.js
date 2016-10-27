import BillReceiveMenuComponent from "./bill-receive-menu.component";

export default {
    components: {
        "bill-receive-menu-component": BillReceiveMenuComponent
    },
    template: `
        <div class="section">
            <div class="container">
                <h1>{{ title }}</h1>

                <bill-receive-menu-component></bill-receive-menu-component>
            </div>
        </div>

        <router-view></router-view>
    `,
    data () {
        return {
            title: "Contas a Receber"
        };
    }
};
