import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const NavigationItems = () => (
   <ul className={classes.NavigationItems}>
   <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
   <NavigationItem link="/orders" active>Orders</NavigationItem>
   </ul>
)
export default NavigationItems;
