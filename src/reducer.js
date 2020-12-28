export const initialState = {
    basket: [],
    user: null
};
  
// Selector
// This says take the basket, and then add price of each item to the amount, initially 0
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return{
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_FROM_BASKET":
            //Find the index of the item to be removed from the basket array
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            
            // Copy of current basket
            let newBasket = [...state.basket];

            if(index>=0){
                // It found the id
                // Splice cuts out the item at the index position from the array
                newBasket.splice(index, 1)
            }
            else{
                //Item not in basket
                console.warn(`Can't remove product (id: ${action.id}) as item is not in the basket`)
            }
            return{
                ...state,
                basket: newBasket,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }
        default:
            return state;
    }
};

export default reducer;