import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.Open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
     <Aux>
     <Backdrop show={props.open} clicked={props.closed} />
          <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
             <Logo />
          </div>
               <NavigationItems isAuthenticated = {props.isAuth}/>
           </div>
      </Aux>
    )
}
export default SideDrawer;
