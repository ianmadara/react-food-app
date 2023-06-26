import React, {useState} from "react";

const ShowCartContext = React.createContext({
    showCartCondition: true,
    showFoodCart : () => {},
    closeFoodCart : () => {},
});
export const ShowCartContextProvider = (props) => {
    const [showCart, setShowCart] = useState(false);
    const showCartHandler = (props) => {
        setShowCart(true);
    };
    const hideCartHandler = () => {
        setShowCart(false);
    };
    return <ShowCartContext.Provider value={{
        showCartCondition: showCart,
        showFoodCart: showCartHandler,
        closeFoodCart: hideCartHandler,
    }}>{props.children}</ShowCartContext.Provider>
}
export default ShowCartContext