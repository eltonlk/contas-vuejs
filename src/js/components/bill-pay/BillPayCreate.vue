<template>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="row">
                <div class="input-field col s6">
                    <input id="date_due" type="text" v-model="bill_pay.date_due | dateLocalize">
                    <label for="date_due" class="active">Vencimento</label>
                </div>

                <div class="input-field col s6">
                    <input id="value" type="text" v-model="bill_pay.value | numberToCurrency">
                    <label for="value" class="active">Valor</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s6">
                    <select class="browser-default" v-model="bill_pay.name | upcase">
                        <option v-for="name in names" :value="name">{{ name }}</option>
                    </select>
                    <label for="name" class="active">Nome</label>
                </div>

                <div class="input-field col s6">
                    <input type="checkbox" class="filled-in" id="done" v-model="bill_pay.done"/>
                    <label for="done">Pago</label>
                </div>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ action == 'create' ? 'Adicionar' : 'Alterar' }}
            </button>
        </form>
    </div>
<template>

<script>
    /* global Materialize */

    import {Bill} from "../../bill";
    import {BillPayResource} from "../../resources";

    const payNames = [
        "CONTA DE LUZ",
        "CONTA DE ÁGUA",
        "CONTA DE TELEFONE",
        "SUPERMERCADO",
        "CARTÃO DE CRÉDITO",
        "EMPRÉSTIMO",
        "GASOLINA"
    ];

    export default {
        data () {
            return {
                action: "create",
                bill_pay: new Bill(),
                names: payNames
            };
        },
        created () {
            if (this.$route.name === "bill-pay.update") {
                this.action = "update";
                this.getBillPay(this.$route.params.id);
            }
        },
        methods: {
            submit () {
                if (this.action === "create") {
                    BillPayResource.save({}, this.bill_pay.toJSON()).then(() => {
                        this.$router.go({ name: "bill-pay.list" });

                        Materialize.toast("Conta criada com sucesso!", 4000);
                    });
                } else {
                    BillPayResource.update({ id: this.bill_pay.id }, this.bill_pay.toJSON()).then(() => {
                        this.$router.go({ name: "bill-pay.list" });

                        Materialize.toast("Conta atualizada com sucesso!", 4000);
                    });
                }
            },
            getBillPay (id) {
                BillPayResource.get({ id: id }).then((response) => {
                    this.bill_pay = new Bill(response.data);
                });
            }
        }
    };
</script>

