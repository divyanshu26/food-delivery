import { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const cartCtx = useContext(CartContext);
  const items = [...cartCtx.items];

  const cartItems = (
    <div className={classes["cart-items"]}>
      <ul >
        {items.map((item) => (
          <li key={item.id} className={classes.items}>
            <span className={classes['item-name']}>{item.name}</span>
            <span>{item.quantity}</span>
            <button
              className={classes.delButton}
              onClick={cartCtx.removeItem.bind(null, item.id)}
            >
              Remove
            </button>
          </li>
        ))}
        <br/>
      </ul>
    </div>
  );

  async function placeOrder(user) {
    let message = setPlacingOrder(true);
    try {
      let response = await fetch(
        "https://food-delivery-75541-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ ...user, items: cartCtx.items }),
        }
      );
      console.log(response);
      let result = await response.json();
      message = "Order Placed Sucessfully";
    } catch (err) {
      message = "some error occured";
      console.log("try-catch", err);
    }
    setOrderPlaced(true);
    setPlacingOrder(false);
    setOrderMessage(message);
    cartCtx.emptyCart();
  }
  function orderHandler(evt) {
    if (items.length < 1) return;
    setOrder(true);
  }
  let modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.hideCart}>
        close
      </button>
      {items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  let beforeOrderPlacing = (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {order ? (
        <Checkout
          goToOrder={setOrder.bind(null, false)}
          onConfirm={placeOrder}
        ></Checkout>
      ) : (
        modalActions
      )}
    </div>
  );
  return (
    <Modal onClick={props.hideCart}>
      {!orderPlaced && !placingOrder && beforeOrderPlacing}
      {placingOrder && !orderPlaced && (
        <p>Placing your order.Please Wait....</p>
      )}
      {orderPlaced && !placingOrder && <p>{orderMessage}</p>}
    </Modal>
  );
};

export default Cart;
