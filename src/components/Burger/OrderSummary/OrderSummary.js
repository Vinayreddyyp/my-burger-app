import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
   componentWillUpdate() {
      console.log("update the model");
   }
    render() {
      const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
           return <li key={igKey}>
           <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
      });

      return (
        <Aux>
           <h3> Your Order </h3>
           <p> A delicious burger  with the following ingredients </p>
          <ul>
           {ingredientSummary}
          </ul>
          <p><strong>TotalPrice: {this.props.price.toFixed(2)}</strong></p>
          <p>Please checkout ? </p>
          <Button btnType="Success" clicked={this.props.PurchaseContinued}>Continue</Button>
          <Button btnType="Danger" clicked={this.props.PurchaseCancelled}>Cancel</Button>
        </Aux>
      )
   }
}

export default OrderSummary;
