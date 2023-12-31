import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const newTotalAmount = state.totalAmount + (action.item.price * action.item.amount)
        const exitingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id
        })
        const existingCartItem = state.items[exitingCartItemIndex]
        let updatedItems;
        if (existingCartItem) {
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[exitingCartItemIndex] = updateItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }

    if (action.type === "REMOVE_ITEM") {
        const exitingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id
        })

        const existingItem = state.items[exitingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id)
        } else {
            const updateItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items]
            updatedItems[exitingCartItemIndex] = updateItem
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD_ITEM', item: item});
    }
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>);
}

export default CartProvider