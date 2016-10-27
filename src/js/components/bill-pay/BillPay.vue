<template>
    <div class="section">
        <div class="container">
            <h1>{{ title }}</h1>

            <bill-pay-menu-component></bill-pay-menu-component>
        </div>
    </div>

    <router-view></router-view>
</template>

<script>
    import BillPayMenuComponent from "./BillPayMenu.vue";

    export default {
        components: {
            "bill-pay-menu-component": BillPayMenuComponent
        },
        data () {
            return {
                title: "Contas a Pagar"
            };
        }
    };
</script>
