import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
   meat: 1.25,
   salad: 0.5,
   cheese: 0.3,
   bacon: 0.7
};


class BurgerBuilder extends Component {
  state = {
      ingredients: {
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
  }


  updatePurchaseState(ingredients) {
    console.log("updated Ingredients", ingredients);
    const sum = Object.keys(ingredients).map((igkey) => {
      return ingredients[igkey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
     console.log("sum", sum);
    this.setState({purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    console.log("add type", type);
    const oldCount = this.state.ingredients[type];
      console.log("oldCount", oldCount);
    const updatedCount = oldCount + 1;
      console.log("updatedCount", updatedCount);
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0 ) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState();
  }

  purchaseHandler = () => {
     this.setState({ purchasing : true});
  }
  purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
  }

  PurchaseCancelled = () => {
      this.setState({ purchasing: false });
  }
  PurchaseContinued = () => {
    alert('continued');
  }
  render() {
    const disabledInfo = { ...this.state.ingredients }
      for(let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
    return (
      <Aux>
       <Modal
         show={this.state.purchasing}
         modlaClosed={this.purchaseCancelHandler}>
        <OrderSummary ingredients={this.state.ingredients}
           PurchaseCancelled={this.PurchaseCancelled}
           PurchaseContinued={this.PurchaseContinued}
           price={this.state.totalPrice}/>
       </Modal>
           <Burger ingredients= {this.state.ingredients}/>
           <BuildControls ingredientAdded={this.addIngredientHandler}
           ingredientRemove={this.removeIngredientHandler}
           disabled={this.disabledInfo}
           purchasable={this.state.purchasable}
           ordered= {this.purchaseHandler}
           price={this.state.totalPrice} />
      </Aux>
    )
  }
}

export default BurgerBuilder;
