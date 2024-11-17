import { createContext } from "react";

export const Context = createContext();

export const initialState = {
    cart: [],
    wishlist: [],
    subTotal: 0,
    totalQuantity:0,
    gst: 0,
    shipping: 0,
    discount: 0,
    finalAmount: 0
};

//default value 
const gstAmount = 0.18;
const shippingAmount = 100;

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const itemInCart = state.cart.find(item => item.id === action.payload.id);
            if (itemInCart) {
                return {
                    ...state,
                    cart: state.cart.map(item => item.id === action.payload.id ? {
                        ...item, quantity: item.quantity + 1
                    } : item)
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                };
            }

        case 'ADD_TO_WISHLIST':
            const itemWishlist = state.wishlist.find(item => item.id === action.payload.id);
            if (itemWishlist) {
                return {
                    state
                };
            } else {
                return {
                    ...state,
                    wishlist: [...state.wishlist, { ...action.payload }],
                };
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            }

        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item.id !== action.payload),
            }

        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }

        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id ? {
                    ...item, quantity: item.quantity + 1
                } : item)
            }

        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id && item.quantity > 1 ? {
                    ...item, quantity: item.quantity - 1
                } : item)
            }

        case 'CALCULATE_TOTALS':
            const { subTotal, totalQuantity } = state.cart.reduce((acc,item) => {
                acc.subTotal += item.price * item.quantity;
                acc.totalQuantity += item.quantity;
                return acc;
            },
            {subTotal: 0, totalQuantity: 0}
        );

        const gst = subTotal * gstAmount;
        const shipping = shippingAmount;
        const finalAmount = subTotal + gst + shipping - state.discount;

        return {
            ...state,
            subTotal,
            totalQuantity,
            gst,
            shipping,
            finalAmount
        }

        case 'APPLY_COUPON':
            if(action.payload === '100Off'){
                return {...state, discount:100}
            }else if(action.payload === '200Off'){
                return {...state, discount:200}
            }else{
                alert("Invalid coupon code! Enter 100Off");
                return state;
            }

        case 'REMOVE_COUPON':
            return {...state, discount: 0}
        
        default: return state;
    }
}
