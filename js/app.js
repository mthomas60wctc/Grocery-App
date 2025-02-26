import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// Component names should be TitleCase/PascalCase
// and should be multi-word, but singular in plurality.
// When used in HTML/templates, they become kabob-case.
const app = createApp({
    // data:    Data created and maintained by this component.
    //          This function is like a constructor. It gets called
    //          separately for each instance of this component
    data: function () {
        return {
            unitsList: [
                'count',
                'ounces',
                'fluid ounces'
            ],
            newItem: {
                name: '',
                qty: 0,
                shopQty: 0,
                unit: '',
                purchased: false
            },
            foodList: [
                { name: 'Apples', qty: 6, shopQty: 12, unit: 0, purchased: false },
                { name: 'Ground beef', qty: 128, shopQty: 12, unit: 1, purchased: true },
                { name: 'Chicken breast', qty: 0, shopQty: 14, unit: 0, purchased: false },
                { name: 'Chicken stock', qty: 16, shopQty: 0, unit: 2, purchased: false }
            ],
        };
    },

    // props:   Data passed into the component via attributes.
    //          Props can be optional or required. Objects and arrays
    //          are pass-by-reference. Primitives (number, string, boolean)
    //          are pass-by-value.
    props: {

    },

    // methods: Usually "events" triggered by v-on:
    methods: {
        capitalizeFirstLetter(val) {
            return String(val).charAt(0).toUpperCase() + String(val).slice(1);
        },

        populateAddUnit() {
            const selectUnit = document.getElementById('select-unit');
            const val = this.foodList.find(e => e.name == this.capitalizeFirstLetter(this.newItem.name));
            if (val == null) {
                selectUnit.disabled = false;
                return;
            }
            selectUnit.selectedIndex = val.unit;
            this.newItem.unit = val.unit;
            selectUnit.disabled = true;
        },
        
        addItem(list) {
            document.getElementById('select-unit').disabled = false;
            if (list == "shopping") {
                this.newItem.shopQty = this.newItem.qty;
                this.newItem.qty = 0;
            }
            this.newItem.name = this.capitalizeFirstLetter(this.newItem.name);
            const val = this.foodList.find(e => e.name == this.newItem.name);
            if (val == null){
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
            val.qty += this.newItem.qty;
            val.shopQty += this.newItem.shopQty;
            this.newItem = {
                name: '',
                qty: 0,
                shopQty: 0,
                unit: '',
                purchased: false
            }
        },

        finishShopping(){
            const restockCheckbox = document.getElementById('restock-check');
            const restock = restockCheckbox.checked;
            restockCheckbox.checked = false;
            for (let item of this.shoppingList){
                if (!item.purchased) continue;
                if (restock) item.qty += item.shopQty;
                item.shopQty = 0;
                item.purchased = false;
            }
        },

        removeItem(name){
            const item = this.foodList.find(e => e.name = name);
            const idx = this.foodList.indexOf(item);
            this.foodList = this.foodList.splice(idx, 1);
        }
    },

    // computed:    Values that are updated and cached if dependencies change.
    //              Computed value functions need to return a value.
    //              Treat these like regular values that you would use
    //              in data or props.
    computed: {
        inventoryList() {
            return this.foodList.filter(item => {
                return item.qty > 0;
            });
        },
        shoppingList() {
            return this.foodList.filter(item => {
                return item.shopQty > 0;
            });
        }
    }
});

export default app;