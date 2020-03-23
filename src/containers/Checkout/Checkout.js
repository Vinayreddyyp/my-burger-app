import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
   

    componentWillMount() {
        this.props.onPurchaseInit();
    }

    CheckoutCancelHandler = () => {
      this.props.history.goBack();
    }
  
    CheckoutContinueHandler = () => {
        console.log("CheckoutContinueHandler", this.props);
         this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to='/'/>

        if(this.props.ings) {
            debugger;
            console.log("props of contact data", this.props.purchased);
            const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null
             summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        cancelHandler = {this.CheckoutCancelHandler}
                        continueHandler = {this.CheckoutContinueHandler}/>
                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        component = {ContactData} />
                </div>
                
            )
        }
        return summary
    }
}

const mapStateToprops = state => {
    console.log("checkout state", state);
    
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }

}

const mapDispatchToProps = dispatch => {
    
    return {
        onPurchaseInit : () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(Checkout);