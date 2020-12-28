import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import "./Payment.css"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from '../../reducer';
import axios from '../../axios';
import { db } from '../../firebase';

function Payment() {
    const [{basket, user} , dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);


    //Whenever the value of basket changes, update the stripe secret to charge the correct amount
    useEffect(() => {
        //Generate stripe secret to allow stripe to charge a customer

        const getClientSecret = async() =>{
            const response = await axios({
                method: 'post',

                //Stripe expects total in a currencies subunits, ie if using $ stripe wants it in cents
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('Client Secret is' , clientSecret)


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent is the Payment confirmation from stripe
            
            // Add info to the firebase
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            
            setSucceeded(true);
            setProcessing(false);
            setError(null);
            
            dispatch({
                type: "EMPTY_BASKET"
            })
            history.replace("/orders")
        })
    }

    const handleChange = e =>{
        //Listen for changes in card elements and display errors if any
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");

    }

    return (
        <div className="payment">
            <div className = "payment__container">
                
                <h1> 
                    Checkout (<Link to ="/checkout">{basket?.length} items</Link>)
                </h1>

                <div className= "payment__section">
                    <div className= "payment__title">
                        <h3> Delivery Address</h3>
                    </div>
                    <div className= "payment__address">
                        <p> {user?.email} </p>
                        <p> 123, React Lane </p>
                        <p> Los Angeles, CA </p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className= "payment__title">
                        <h3> Review Items and Delivery</h3>
                    </div>
                    <div className = "payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className = "payment__title">
                        <h3> Payment Method</h3>
                    </div>

                    <div className = "payment__details">
                        {/*Stripe for payment*/}
                        <form onSubmit = {handleSubmit}>
                            <CardElement className = "payment_detailsCardElement" onChange = {handleChange}/>

                            <div className ="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                    <>
                                        <h3> Order Total: {value} </h3>
                                    </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} 
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button  disabled={processing || disabled || succeeded}>
                                    <span> {processing ? <p> Processing </p>: "Buy Now"} </span> 
                                </button>
                            </div>
                            
                            {/* Show Errors if any */}
                            {error && <div> {error} </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
