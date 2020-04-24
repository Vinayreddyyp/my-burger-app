import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignOut();
  }
    render() {
     
      let route = (
          <Switch>
            <Route path= '/checkout' component={Checkout}/>
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect path="/" />
          </Switch> 
      )

      if(this.props.isAuthenticated) {
        route = (
          <Switch>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth} />
            <Route path='/logout' component={LogOut} />
            <Redirect path="/" />
          </Switch> 
        )
      }
      
        return (
          <div>
            <Layout>
              {route}
            </Layout>

           </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignOut : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
