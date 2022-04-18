import { useState, useReducer } from 'react';
import CartContext from "./cart-context";
import chkContext from './check';

function cartReducer(state, action) {
    console.log('add');
    let arr = [];
    let exists = false;
    let priceIncrease = 0;
    let obj = {};
    obj.cartItems = [...state.cartItems];
    obj.totalAmount = state.totalAmount;
    if (action.type === 'AddItem') {
        let item = action.value;
        arr = obj.cartItems.map(elem => {
            let up_elem = {...elem};
            if (elem.id === item.id) {
                //console.log(elem);
                exists = true;
                //debugger;
                up_elem.quantity = elem.quantity +  item.quantity;
                priceIncrease = item.quantity * item.price;
            }
            return up_elem;
        });
        if (!exists) {
            arr.push(item);
            priceIncrease = item.quantity * item.price;
        };
        return {
            cartItems: arr,
            totalAmount: obj.totalAmount += priceIncrease,
        };

    } else if (action.type == "Remove") {
        console.log(state.totalAmount);
        let id = action.value;
        let priceDecrease = 0;
        const arr = state.cartItems.filter(item => {
            if (item.id == id) priceDecrease = item.quantity * item.price;
            return item.id != id
        });
        let amount = state.totalAmount - priceDecrease;
        debugger;
        state.totalAmount -= priceDecrease;
        return {
            cartItems: [...arr],
            totalAmount: amount,
        };
     } else if(action.type==='EMPTY-CART'){
         return {
             cartItems:[],
             totalAmount:0
            }
     };
    return { cartItems: [], totalAmount: 0 };
};


const CartContextProvider = (props) => {


    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartState, dispatchCartState] = useReducer(cartReducer, { cartItems: [], totalAmount: 0 });
    //console.log("provider");
    const addItemHandler = (item) => {
         dispatchCartState({ type: 'AddItem', value: item });
        // setCartItems(arr);
        // setTotalAmount(prevTotal => {
        //     prevTotal += priceIncrease;
        //     return prevTotal;
        // });
    };

    const removeItemHandler = (id) => {
        dispatchCartState({type:'Remove',value:id});
    };

    const emptyCartHandler = ()=>{
        dispatchCartState({type:'EMPTY-CART'});
    };

    const cartContext = {
        items: cartState.cartItems,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        emptyCart: emptyCartHandler

    };

    return (
        <>
            <CartContext.Provider value={cartContext}>
                {props.children}
            </CartContext.Provider>
        </>
    );
};


export default CartContextProvider;