export const intialState = {
    basket: [],
    user: null,
    totalprice: { price: 0, ship: 40, coupon: 0 },
    order: null,
};



function reducer(state, action) {
    switch (action.type) {
        case 'SET_ORDER':
            return {
                ...state,
                order: action.order
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user

            }
        case 'SET_PRICE':
            return {
                ...state,
                totalprice: {...action.totalprice}
            }
        case 'remove':
                return {
                    ...state,
                    basket: []
                }

        case 'ADD':

            return {
                ...state,
                basket: { ...action.item }
            }

        case 'REMOVE':

            let newbasket = [...state.basket]
            const index = state.basket.findIndex((item) => item.id === action.id);
            newbasket.splice(index, 1)

            return {
                ...state,
                basket: newbasket,
            }


        default:
            return state;

    }

}

export default reducer