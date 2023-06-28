import React, {useContext, useEffect, useState} from "react";
import classes from './HeaderCartButton.module.css'
import CartIcon from "./CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300)
        setBtnIsHighlighted(true)
        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton