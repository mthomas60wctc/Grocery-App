const AppModal = {

    data: function () {
        return {
            bsModal: null,
        }
    },

    props: {
        title: {
            type: String,
            default: "Confirmation"
        },
        declineText: {
            type: String,
            default: "Cancel"
        },
        acceptText: {
            type: String,
            default: "Continue"
        },
    },

    methods: {

        open() {
            this.bsModal.show()
        },
    },

    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.modal)
    },

    template: `
    <div class="d-inline-block">
        <slot name="open">
           <button class="btn btn-tiny" @click="open">Open Modal</button>
        </slot>
        <div class="modal fade" tabindex="-1" ref="modal" aria-label="{{title}}"
           aria-hidden="true">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                       <h1 class="modal-title fs-5">{{title}}</h1>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-body">
                       <slot>
                       </slot>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{declineText}}</button>
                       <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('modal-confirmed')">{{acceptText}}</button>
                   </div>
               </div>
           </div>
        </div>
    </div>
    `,
};

export default AppModal;
