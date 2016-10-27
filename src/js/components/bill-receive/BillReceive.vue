<template>
    <div class="section">
        <div class="container">
            <h1>{{ title }}</h1>

            <bill-receive-menu-component></bill-receive-menu-component>
        </div>
    </div>

    <router-view></router-view>
</template>

<script>
    import BillReceiveMenuComponent from "./BillReceiveMenu.vue";

    export default {
        components: {
            "bill-receive-menu-component": BillReceiveMenuComponent
        },
        data () {
            return {
                title: "Contas a Receber"
            };
        }
    };
</script>
