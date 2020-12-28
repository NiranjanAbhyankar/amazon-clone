import React from 'react'
import { useStateValue } from '../../StateProvider';
import "./CheckoutProduct.css";


function CheckoutProduct({ id, image, title,price, rating, hideButton}) {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // Remove item from basket
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id:id
        });
    };

    return (
        <div className = "checkoutProduct">
            <img className = "checkoutProduct__image" src= {image} alt = "" />

            <div className = "checkoutProduct__info">
                <p className = "checkoutProduct__title">
                    {title} 
                </p>
                <p className = "checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                {/* Create an empty array of length "rating" and then for every element in the array, map that element with a star */}
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map(() => (
                        <p>🌟</p>
                    ))}
                </div>
                
                {!hideButton && (
                    <button onClick = {removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
