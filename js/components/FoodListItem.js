import ConfirmationModal from "./ConfirmationModal.js";

const FoodListItem = {
    components: {
        ConfirmationModal,
    },

    data: function () {
        return {
            editing: false,
            editVal: 0,
        }
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
        checkLabel: {
            type: String,
            default: '',
        },
        quantityAttr: {
            type: String,
            default: "qty"
        }
    },

    methods: {

        editToggle() {
            //if currently editing
            if (this.editing) {
                // done editing
                this.editing = false;
                //save value to object
                this.item[this.quantityAttr] = this.editVal;
            }
            //if not editing
            else {
                // start editing
                this.editing = true;
                //initial value is item quantity
                this.editVal = this.item[this.quantityAttr];
            }
        }
    },

    template: `
    <li class="list-group-item d-flex justify-content-between align-items-start" style="height: 72px;">
        <div v-if="editing" class="ms-2 me-auto">
            <div class="fw-bold">{{item.name}}</div>
            <div class="form-inline input-group row">            
                <label class="control-label input-group">
                <input class="form-control form-control-sm me-2 mp-0" type="text" v-model="editVal">
                {{item.unit}}
                </label>
            </div>
        </div>
        <div v-else class="ms-2 me-aut">
            <div class="fw-bold">{{item.name}}</div>
            <span >{{item[quantityAttr] + " " + item.unit}}</span>
        </div>
        <i v-if="editing" class="bi bi-check2-circle h3 mx-5" width="18" height="18" viewBox="0 0 16 16"  @click="editToggle"></i>
        <div v-else>
            <label v-if="checkLabel != ''" class="me-1 mx-2 my-1">
                <input class="form-check-input" type="checkbox" value="" v-model="item.purchased">
                {{checkLabel}}
            </label>
            <i class="bi bi-pencil-square h4 mx-2" @click="editToggle"></i>
            <confirmation-modal :title="'Remove ' + item.name" acceptText="Remove" ref=deleteModal @modal-confirmed="$emit('remove-item', item)">
                <template #open>
                <i class="bi bi-trash h4 mx-2" @click="$refs.deleteModal.open()"></i>
                </template>
                Are you sure you want to remove {{item.name}} from all lists? If you just want to remove it from the current list set the quantity to 0.
            </confirmation-modal>
        </div>
    </li>
    `,
};

export default FoodListItem;

