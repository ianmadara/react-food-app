import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input";
import {useRef, useState} from "react";


const MealItemForm = (props) => {
    const amountInputRef = useRef()
    const [amountIsValid, setAmountIsValid]=useState(true)
    const inputDetails = {
        id: "amount_" + props.id,
        type: "number",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 1,
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber)
    }
    return <form onSubmit={submitHandler} className={classes.form}>
        <Input
            ref={amountInputRef}
            label={"Amount"}
            input={inputDetails}/>
        <button>+ADD</button>
        {!amountIsValid && "<p>Please enter a valid amount (1-5)</p>"}
    </form>

}
export default MealItemForm