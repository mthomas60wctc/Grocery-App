import FoodListItem from "./FoodListItem.js";


const FoodListContainer = {

    components: {
        FoodListItem,
    },

    data: function(){
        return {}
    },

    props: {
        foodList: {
            type: Array,
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


    template: `
    <ol class="list-group">
        <food-list-item v-for="item in foodList" :item="item" :quantityAttr = quantityAttr :checkLabel = checkLabel @remove-item="item => $emit('remove-item', item)">
        </food-list-item>
    </ol>
    `,
};

export default FoodListContainer;
