import ConfirmationModal from "./ConfirmationModal.js";

const RecipeListItem = {
    components: {
        ConfirmationModal,
    },

    data: function () {
        return {}
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
        canMake: {
            type: Number,
            required: true,
        }
    },

    methods: {

    },

    template: `
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-aut">
            <div class="fw-bold">
                <i v-if="canMake==0" style = "color:#dc3545;" class="bi bi-x-circle"></i>
                <i v-if="canMake==1" style = "color:#ffc107;" class="bi bi-dash-circle"></i>
                <i v-if="canMake==2" style = "color:#20c997;" class="bi bi-check-circle"></i>
                {{item.name}}
            </div>
            <div class="row">
                <span width="100">{{"Feeds: " + item.feeds}}</span>
                <span v-if="item.prep < 60">{{"Prep Time: " + item.prep + " minutes"}}</span>
                <span v-else-if="item.prep % 60 == 0">{{"Prep Time: " + item.prep / 60  + " hours"}}</span>
                <span v-else>{{"Prep Time: " + Math.floor(item.prep / 60) + " hours " + item.prep % 60 + " minutes"}}</span>
</div>
        </div>
        <div>
            <!-- <i class="bi bi-pencil-square h4 mx-2"></i> -->
            <confirmation-modal :title="'Remove ' + item.name" acceptText="Remove" ref=deleteModal @modal-confirmed="$emit('remove-item', item)">
                <template #open>
                <i class="bi bi-trash h4 mx-2" @click="$refs.deleteModal.open()"></i>
                </template>
                Are you sure you want to remove {{item.name}} from recipe list?
            </confirmation-modal>
        </div>
    </li>
    `,
};

export default RecipeListItem;

