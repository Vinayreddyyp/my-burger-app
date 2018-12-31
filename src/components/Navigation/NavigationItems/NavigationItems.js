import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const NavigationItems = () => (
   <ul className={classes.NavigationItems}>
   <NavigationItem link="/" active>BurgerBuilder</NavigationItem>
   <NavigationItem link="/" active>Checkout</NavigationItem>
   </ul>
)
export default NavigationItems;
