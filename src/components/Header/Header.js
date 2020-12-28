import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase';

function Header() {
    const [{basket, user}] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className = "header">
            <Link to = "/home">
                <img className = "header__logo" src = "https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""/>
            </Link>
            
            <div className = "header__search">
                <input type = "text" className = "header__searchInput" />
                <SearchIcon className = "header__searchIcon" />
            </div>
            <div className = "header__nav">
                {/* Only redirect to the login page if there is no user */}
                <Link to ={!user && "/login"}>
                    <div onClick = { handleAuthentication } className = "header__option">
                        <span className = "header__optionLineOne"> Hello {user ? user.email : 'Guest'} </span>
                        <span className = "header__optionLineTwo"> {user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                
                <Link to = {"/orders"}>
                    <div className = "header__option">
                        <span className = "header__optionLineOne"> Returns </span>
                        <span className = "header__optionLineTwo"> &Orders </span>
                    </div>
                </Link>
                
                <div className = "header__option">
                    <span className = "header__optionLineOne"> Your </span>
                    <span className = "header__optionLineTwo"> Prime </span>
                </div>
                
                <Link to = "/checkout">
                    <div className = "header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className = "header__optionLineTwo header__basketCount"> 
                            {/* Just show length of basket array as no. of items
                            Also ?.length means if basket becomes undefined it would 
                            return undefined instead of throwing an error. This is called optional chaining */}
                            {basket?.length} 
                        </span>
                    </div> 
                </Link>
                
                
            </div>
        </div>
    )
}

export default Header
