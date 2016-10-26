let billReceiveMenuComponent = require("./bill-receive-menu.component");

module.exports = {
    components: {
        "bill-receive-menu-component": billReceiveMenuComponent
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
