import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import FoodListContainer from "./components/FoodListContainer.js";
import ConfirmationModal from "./components/ConfirmationModal.js";
import AddItemModal from "./components/AddItemModal.js";

const app = createApp({

    components: {
        FoodListContainer,
        ConfirmationModal,
        AddItemModal,
    }, 
    
    data: function () {
        return {

            foodList: [
                { name: 'Apples', qty: 8, shopQty: 12, unit: 'count', purchased: false },
                { name: 'Ground beef', qty: 128, shopQty: 12, unit: 'ounces', purchased: true },
                { name: 'Chicken breast', qty: 0, shopQty: 14, unit: 'count', purchased: false },
                { name: 'Chicken stock', qty: 16, shopQty: 0, unit: 'fluid ounces', purchased: false }
            ],
        };
    },

    
    methods: {

        finishShopping(restock){
            for (let item of this.shoppingList){
                if (!item.purchased) continue;
                if (restock) item.qty += item.shopQty;
                item.shopQty = 0;
                item.purchased = false;
            }
        },

        removeItem(item){
            const idx = this.foodList.indexOf(item);
            if (idx <= -1){
                return;
            }
            this.foodList.splice(idx, 1);
            for (let f of this.foodList)
            {
                console.log(f.name);
            }
        },

        setInveotoryBool(){
            console.log("set!");
            addToInventory = true
        }
    },

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