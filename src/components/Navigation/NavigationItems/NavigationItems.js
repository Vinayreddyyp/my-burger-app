import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const NavigationItems = (props) => (
   <ul className={classes.NavigationItems}>
   <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
  { props.isAuthenticated ? <NavigationItem link="/orders" active>Orders</NavigationItem> : null }
   { !props.isAuthenticated ? 
     <NavigationItem link="/auth"   active>Authentication</NavigationItem> :
     <NavigationItem link="/logout"   active>Logout</NavigationItem> 
   } 
   </ul>
)
export default NavigationItems;
