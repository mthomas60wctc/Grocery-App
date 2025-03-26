import RecipeListItem from "./RecipeListItem.js";


const RecipeListContainer = {

    components: {
        RecipeListItem,
    },

    data: function(){
        return {}
    },

    props: {
        recipeList: {
            type: Array,
            required: true,
        },
        canMakeList: {
            type: Array,
            required: true,
        },
    },


    template: `
    <ol class="list-group">
        <recipe-list-item v-for="(item, index) in recipeList" :item="item" :canMake="canMakeList[index]" @remove-item="item => $emit('remove-item', item)">
        </recipe-list-item>
    </ol>
    `,
};

export default RecipeListContainer
;
