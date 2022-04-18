import { useRef } from "react";

import classes from './Checkout.module.css';


const Checkout =(props)=>{
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const zipInputRef = useRef();
    const cityInputRef = useRef();

    function palceOrderHandler(evt){
        evt.preventDefault();
        props.onConfirm({
            name: nameInputRef.current.value,
            street: streetInputRef.current.value,
            zip: zipInputRef.current.value,
            city: cityInputRef.current.value
        });
    };

    return (
        <form>
        <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type='text' id='name' ref= {nameInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input type='text' id='street' ref= {streetInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="zip">Your Postal</label>
            <input type='text' id='zip' ref= {zipInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="city">Your City</label>
            <input type='text' id='city' ref= {cityInputRef}/>
        </div>
        
        <div className={classes.actions}>
        <button type='button' className={classes['button-alt']} onClick={()=>{
            console.log('cancelOrder');
            props.goToOrder();
        }}>Cancel</button>
        <button className={classes.button} onClick={palceOrderHandler}>Confirm</button>
        </div>
        </form>
    );
};

export default Checkout;