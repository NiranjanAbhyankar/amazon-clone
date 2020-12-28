import './App.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Checkout from './components/Checkout/Checkout';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login/Login';
import React, { useEffect } from 'react'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js'
import Orders from './components/Orders/Orders';


const promise = loadStripe("pk_test_51I2dfRGKaElLTYFVYKoW8UtzTHquqhoEKHFJUaT0Ky26eYnuotpWNVWoQrletZiRMXML4Jr3iT9eBokQFxTQE86900ZeK5s4KJ")

function App() {

  const [{basket}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The user is ', authUser)
    

      if(authUser){
        //User logged in
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }

      else{
        //User is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path ="/login">
            <Login />
          </Route>
          <Route exact path ="/orders">
            <Header />
            <Orders/>
          </Route>
          <Route exact path ="/">
            <Header />
            <Home /> 
          </Route>
          <Route exact path ="/home">
            <Header />
            <Home /> 
          </Route>
          <Route exact path ="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path ="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment/> 
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
