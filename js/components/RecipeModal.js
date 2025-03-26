import AppModal from "./AppModal.js";

const RecipeModal = {
  components: {
    AppModal,
  },

  data: function () {
    return {
      newItem: {
        name: '',
        qty: 0,
        shopQty: 0,
        unit: '',
        purchased: false
      },
      recipeModal: null,
      unitSelectL: null,
    };
  },

  props: {
    title: {
      type: String,
      default: "New Recipe"
    },
    foodList: {
      type: Object,
      required: true,
    },
    acceptText: {
        type: String,
        default: "Make"
    },
  },

  methods: {

    addItem() {
      this.populateAddUnit()
      this.$refs.unitSelect.disabled = false;
      const val = this.foodList.find(e => e.name == this.newItem.name);
      if (val == null) {
        this.foodList.push(this.newItem);
        this.newItem = {
          name: '',
          qty: 0,
          shopQty: 0,
          unit: '',
          purchased: false
        }
        return;
      }
      val[this.quantityAttr] += this.newItem[this.quantityAttr];
      this.newItem = {
        name: '',
        qty: 0,
        shopQty: 0,
        unit: '',
        purchased: false
      }
    },
    regulateText(val) {
      val = val.trim();
      return val.charAt(0).toUpperCase() + val.slice(1);
    },

    populateAddUnit() {
      const selectUnit = this.$refs.unitSelect
      this.newItem.name = this.regulateText(this.newItem.name);
      const val = this.foodList.find(e => e.name == this.newItem.name);
      if (val == null) {
        selectUnit.disabled = false;
        return;
      }
      selectUnit.value = val.unit;
      this.newItem.unit = val.unit;
      selectUnit.disabled = true;
    },

    open() {
      this.$refs.addItemModal.open();
    },

  },

  template: `
    <app-modal :title="title" :acceptText="acceptText" @modal-confirmed="addItem()" ref="addItemModal">
        <template #open>
            <slot name="open">
                <button class="btn btn-primary m-3" @click="$refs.addItemModal.open()">New Item</button>
            </slot>
        </template>
        <div class="mb-3">
            <label for="add-food-name" class="col-form-label">Food Name</label>
            <input type="text" class="form-control" v-model="newItem.name"
                @focusout="populateAddUnit">
        </div>
        <div class="row">
            <div class="mb-1 col-sm-8">
                <label for="add-item-quantity-field" class="col-form-label">Quantity</label>
                <input type="number" class="form-control"
                    v-model="newItem[quantityAttr]">
            </div>
            <div class="mb-2 col-sm-4">
                <label for="add-item-unit-field" class="col-form-label">Unit</label>
                <select class="form-control" ref="unitSelect" v-model="newItem.unit">
                    <option v-for="value of ['count', 'ounces', 'fluid ounces']" :value="value">
                        {{value}}</option>
                </select>
            </div>
        </div>
    </app-modal>
    `,
};

export default RecipeModal;
