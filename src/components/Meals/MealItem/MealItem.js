import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import cartContext from "../../../store/cart-context";

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`
    const cartCtx = useContext(cartContext);
    const addToCartHandler = (amount) => {
        const item = {
            id: props.id,
            name: props.name,
            price: +props.price,
            amount: amount
        }
        cartCtx.addItem(item)
    }

    return (
        <li className={classes.meal}>
            <div className={classes.description}>
                <h3>{props.name}</h3>
                <div>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}
export default MealItem