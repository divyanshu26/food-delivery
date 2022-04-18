import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useContext,useState } from 'react';
import CartContext from '../../../store/cart-context';

const MealItemForm = (props)=>{
    const [itemQuantity, setItemQuantity] = useState(1);
    const cartCtx = useContext(CartContext);
    //console.log('mealform');
    const addItemHandler = (item,evt)=>{
        evt.preventDefault();
        let add_item = {...item};
        add_item.quantity = itemQuantity;
        cartCtx.addItem(add_item);
    };
    function changeItemQuantity(evt){
        setItemQuantity(parseInt(evt.target.value));
    }

    return (
        <form className={classes.form}>
            <Input label="Amount" input={{
                id:'amount',
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }} onChange={changeItemQuantity}/>
            <button onClick={addItemHandler.bind(null,props.item)}>+ Add</button>
        </form>
    );
};

export default MealItemForm;