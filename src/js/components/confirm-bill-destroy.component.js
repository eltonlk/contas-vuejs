let modalComponent = require("./modal.component");
let Bill = require("../bill");

module.exports = {
    components: {
        "modal": modalComponent
    },
    data () {
        return {
            modal: {
                id: "confirm-bill-destroy"
            }
        };
    },
    methods: {
        confirm () {
            this.$dispatch("destroy-bill", this.bill);
        }
    },
    props: {
        bill: {
            type: Object,
            default () {
                return new Bill();
            }
        }
    },
    template: `
        <modal :modal="modal">
            <div slot="content" v-if="bill">
                <h5 class="center-align">Deseja excluir esta conta?</h5>
                <div class="divider"></div>
                <p>Nome: <strong>{{ bill.name | upcase }}</strong></p>
                <p>Valor: <strong>{{ bill.value | numberToCurrency 'pt-BR' }}</strong></p>
                <p>Data de vencimento: <strong>{{ bill.date_due | dateLocalize 'ko-KR' }}</strong></p>
            </div>
            <div slot="footer">
                <button class="btn btn-flat waves-effect modal-close modal-action" @click="confirm()">OK</button>
                <button class="btn btn-flat waves-effect modal-close modal-action">Cancelar</button>
            </div>
        </modal>
    `
};
