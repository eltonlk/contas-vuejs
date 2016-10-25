/* global Vue, billPayMenuComponent */

window.billPayComponent = Vue.extend({
    components: {
        "bill-pay-menu-component": billPayMenuComponent
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
});
