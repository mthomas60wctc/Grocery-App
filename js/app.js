import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import FoodListContainer from "./components/FoodListContainer.js";
import ConfirmationModal from "./components/ConfirmationModal.js";
import AddItemModal from "./components/AddItemModal.js";
import RecipeListContainer from "./components/RecipeListContainer.js";

const app = createApp({

    components: {
        FoodListContainer,
        ConfirmationModal,
        AddItemModal,
        RecipeListContainer,
    }, 
    
    data: function () {
        return {

            foodList: [
                { name: 'Apples', qty: 8, shopQty: 12, unit: 'count', purchased: false },
                { name: 'Ground beef', qty: 128, shopQty: 12, unit: 'ounces', purchased: true },
                { name: 'Chicken breast', qty: 0, shopQty: 14, unit: 'count', purchased: false },
                { name: 'Chicken stock', qty: 16, shopQty: 0, unit: 'fluid ounces', purchased: false },
                { name: 'Chili powder', qty: 20, shopQty: 0, unit: 'ounces', purchased: false }, 
                { name: 'Cumin', qty: 5, shopQty: 0, unit: 'ounces', purchased: false }, 
                { name: 'Salt', qty: 122, shopQty: 0, unit: 'ounces', purchased: false }, 
                { name: 'Cornstarch', qty: 45, shopQty: 0, unit: 'ounces', purchased: false },
            ], 

            recipeList: [
                {name: 'Cincinatti Chili', feeds: 12, prep: 120, 
                    ingredients: [
                        {name: 'Yellow onion', qty: 1}, 
                        {name: 'Ground beef', qty: 48}, 
                        {name: 'Chili powder', qty: 7}, 
                        {name: 'Cumin', qty: 2}, 
                        {name: 'Salt', qty: 3}, 
                        {name: 'Cornstarch', qty: 2}], 
                    Steps: [
                        'Brown ground beef', 
                        'Add seasoning and tomatoes', 
                        'Simmer for 2 hours']}
            ]
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
        },

        removeRecipe(item){
            const idx = this.recipeList.indexOf(item);
            if (idx <= -1){
                return;
            }
            this.recipeList.splice(idx, 1);
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
        },
        canMakeList() {
            const lst = []
            for (let i = 0; i < this.recipeList.length; i++){
                lst[i] = 2; // assume you can make it
                for (const f of (this.recipeList[i].ingredients)){
                    const val = this.foodList.find(e => e.name == f.name);
                    console.log("found " + f.name + " at index " + val)
                    if (val == null) { //food doesnt exist
                        lst[i] = 0; //cannot make
                        break;
                    }
                    if (val.qty + val.shopQty < f.qty){ //not enough on the shopping list
                        lst[i] = 0; //cannot make
                        break;
                    }
                    if (val.qty < f.qty){ //not enough on the inventory list
                        lst[i] = 1; //can make after grocery run, keep checking
                    }
                }
            }
            return lst;
        },
    }
});

export default app;