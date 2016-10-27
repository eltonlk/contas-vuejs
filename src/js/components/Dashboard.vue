<template>
    <div class="container">
        <div class="section">
            <h1>{{ title }}</h1>
        <div>

        <div class="row">
            <div class="col s12 m4">
                <ul class="collection with-header">
                    <li class="collection-header">
                        <h5>Contas</h5>
                    </li>
                    <li class="collection-item">
                        Receber
                        <span class="badge green-text">{{ totalReceives | numberToCurrency }}</span>
                    </li>
                    <li class="collection-item">
                        Pagar
                        <span class="badge red-text">{{ totalPays | numberToCurrency }}</span>
                    </li>
                    <li class="collection-item">
                        <strong>
                            Total
                            <span class="badge">{{ totalReceives - totalPays | numberToCurrency }}</span>
                        </strong>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {BillPayResource, BillReceiveResource} from "../resources";

    export default {
        data () {
            return {
                title: "Dashboard",
                totalPays: 0,
                totalReceives: 0
            };
        },
        created () {
            BillPayResource.total().then((response) => {
                this.totalPays = response.data.total;
            });

            BillReceiveResource.total().then((response) => {
                this.totalReceives = response.data.total;
            });
        }
    };
</script>
