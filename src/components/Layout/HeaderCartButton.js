import React from "react";
import { useContext, useEffect,useState } from "react";
import classes from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    function showCartHandler() {
        props.showCart();
    };

    //console.log(cartCtx.items,'header');
    const noOfItemsInCart = cartCtx.items.reduce((prev, item) => {
        prev += item.quantity
        return prev
    }, 0);
    let btnClasses = `${classes.button} ${btnHighlighted? classes.bump :''}`;
    
    useEffect(() => {
        if(noOfItemsInCart<1)return;
        btnClasses = `${classes.button} ${classes.bump}`;
        setBtnHighlighted(true);
        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 100);

        return ()=>{
            clearTimeout(timer);
        };
    }, [noOfItemsInCart]);


    return (<button className={btnClasses} onClick={props.showCart}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span className={classes.badge}>Your Cart</span>
        <span>{noOfItemsInCart}</span>
    </button>);
};

export default HeaderCartButton;