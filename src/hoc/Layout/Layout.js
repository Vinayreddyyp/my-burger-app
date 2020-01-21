import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  SideDrawerCloseHandler = () => {
     this.setState({showSideDrawer: false})
  }

  SideDrawerToggleHandler = () => {
      this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
      });
  }
    render() {
       return (
         <Aux>
          <Toolbar DrawerToggleClicked={this.SideDrawerToggleHandler}/>
          <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler} />
          <main className={classes.Content}>{this.props.children}</main>
          </Aux>
       )
    }
}

export default Layout;
