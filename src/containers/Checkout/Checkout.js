import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0,
        totalPrice: 0,
    };

    componentWillMount() {
        console.log("query props", this.props);
        const query = new URLSearchParams(this.props.location.search);
        console.log("query", query);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()) {
            console.log("param", param);
            console.log("query.entries()", query.entries());
            if(param[0] === 'price') {
               price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            console.log("ingredients[param[0]] = +param[1];", ingredients[param[0]] = +param[1]);
        };
        this.setState({ingredients: ingredients, totalPrice: price});

    }

    CheckoutCancelHandler = () => {
      this.props.history.goBack();
    }
  
    CheckoutContinueHandler = () => {
        console.log("CheckoutContinueHandler", this.props);
         this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                  ingredients={this.state.ingredients} 
                  cancelHandler = {this.CheckoutCancelHandler}
                  continueHandler = {this.CheckoutContinueHandler}/>
                <Route 
                path={this.props.match.url + '/contact-data'} 
                render={(props) => (<ContactData 
                     ingredients={this.state.ingredients} 
                     price={this.state.totalPrice} {...props}/>)} />
            </div>
        )
    }
};

export default Checkout;