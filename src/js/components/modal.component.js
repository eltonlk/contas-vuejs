/* global Vue */

window.modalComponent = Vue.extend({
    data () {
        return {
            modal: {
                id: ""
            }
        };
    },
    props: [
        "modal"
    ],
    template: `
        <div :id="modal.id" class="modal">
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    `
});
