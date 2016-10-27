<template>
    <div class="container">
        <p :class="{ 'grey-text': status.count === 0, 'red-text': status.pending > 0, 'green-text': status.count > 0 && status.pending === 0 }">
            {{ status | billPaysStatusLabel }}
        </p>

        <table class="bordered striped responsive-table z-depth-1">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Situação</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index, bill_pay) in bill_pays">
                    <td>{{ index + 1 }}</td>
                    <td>{{ bill_pay.date_due | dateLocalize }}</td>
                    <td>{{ bill_pay.name | upcase }}</td>
                    <td>{{ bill_pay.value | numberToCurrency }}</td>
                    <td>
                        <input id="done_{{ bill_pay.id }}" type="checkbox" v-model="bill_pay.done" @change="changeDoneBillPay(bill_pay)"/>
                        <label for="done_{{ bill_pay.id }}">{{ bill_pay.done | billPayDoneLabel }}<label>
                    </td>
                    <td>
                        <a v-link="{ name: 'bill-pay.update', params: { id: bill_pay.id } }">Editar</a> |
                        <a href="#" @click.prevent="openModalDestroy(bill_pay)" class="destroy">Excluir</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <confirm-bill-destroy :bill="billToDestroy"></confirm-bill-destroy>
</template>

<script>
    /* global Materialize */

    import {BillPayResource} from "../../resources";
    import ConfirmBillDestroyComponent from "../ConfirmBillDestroy.vue";

    export default {
        components: {
            "confirm-bill-destroy": ConfirmBillDestroyComponent
        },
        data () {
            return {
                bill_pays: [],
                billToDestroy: null
            };
        },
        created () {
            BillPayResource.query().then((response) => {
                this.bill_pays = response.data;
            });
        },
        methods: {
            changeDoneBillPay (bill_pay) {
                if (confirm("Deseja alterar a situação dessa conta?")) {
                    BillPayResource.update({ id: bill_pay.id }, bill_pay);
                }
            },
            openModalDestroy (bill_receive) {
                this.billToDestroy = bill_receive;

                $("#confirm-bill-destroy").openModal();
            }
        },
        computed: {
            status () {
                let done = 0;

                for(let i in this.bill_pays) {
                    if (this.bill_pays[i].done) {
                        done++;
                    }
                }

                return {
                    count: this.bill_pays.length,
                    pending: this.bill_pays.length - done
                };
            }
        },
        events: {
            "destroy-bill": function (bill) {
                BillPayResource.delete({ id: bill.id }).then(() => {
                    this.bill_pays.$remove(bill);

                    Materialize.toast("Conta excluída com sucesso!", 4000);
                });
            }
        }
    };
</script>
