import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            becaon: 1,
        }
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        };
        this.setState({ingredients: ingredients});

    }

    CheckoutCancelHandler = () => {
      this.props.histroy.goBack();
    }

    CheckoutContinueHandler = () => {
         this.props.histroy.push('/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                  ingredients={this.state.ingredients} 
                  cancelHandler = {this.CheckoutCancelHandler}
                  continueHandler = {this.CheckoutContinueHandler}
                />
            </div>
        )
    }
};

export default Checkout;