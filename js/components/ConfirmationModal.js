import AppModal from "./AppModal.js";

const ConfirmationModal = {
  components: {
    AppModal,
  },

  data: function () {
    return {
      confirmationModal: null,
      checkState: true,
    };
  },

  props: {
    title: {
      type: String,
      default: "Confirmation",
    },
    declineText: {
      type: String,
      default: "Cancel",
    },
    acceptText: {
      type: String,
      default: "Continue",
    },
    checkboxText: {
      type: String,
      default: "",
    },
  },

  methods: {
    open() {
      this.$refs.confirmationModal.open();
    },
  },

  template: `
    <app-modal :title="title" :decline-text="declineText" :acceptText="acceptText" @modal-confirmed="$emit('modalConfirmed', checkState)" ref="confirmationModal">
        <template #open>
            <slot name="open">
                <button class="btn btn-tiny" @click="$refs.confirmationModal.open()">Open Modal</button>
            </slot>
        </template>
        <slot>
        </slot>
        <div v-if="checkboxText != ''">
            <br>
            <input class="form-check-input" type="checkbox" v-model="checkState">
            <label class="form-check-label" for="modal-check">
              {{checkboxText}}
            </label>
        </div>
    </app-modal>
    `,
};

export default ConfirmationModal;
