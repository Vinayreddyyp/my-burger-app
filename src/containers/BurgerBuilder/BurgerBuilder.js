import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axiosOrder';
// import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
// import { initIngredinets } from '../../store/actions/burgerBuilder';




class BurgerBuilder extends Component {
  state = {
      purchasable: false,
      purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }


  updatePurchaseState(ingredients) {
    console.log("updated Ingredients", ingredients);
    const sum = Object.keys(ingredients).map((igkey) => {
      return ingredients[igkey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
     console.log("sum", sum);
    return  sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   console.log("add type", type);
  //   const oldCount = this.state.ingredients[type];
  //     console.log("oldCount", oldCount);
  //   const updatedCount = oldCount + 1;
  //     console.log("updatedCount", updatedCount);
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount <= 0 ) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState();
  // }

  purchaseHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState({ purchasing : true});
    } else {
      this.props.onRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  
  }
  purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
  }

  PurchaseCancelled = () => {
      this.setState({ purchasing: false });
  }

  PurchaseContinued = () => {
   
    // const queryParams = [];
    // for(let i in this.state.ingredients) {
    //     console.log("i in ingredents", i);
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // };
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // console.log("queryParams", queryParams);
        this.props.history.push('/checkout');
  }
  render() {
    const disabledInfo = { ...this.props.ings }
      for(let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;

      let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>

      if (this.props.ings) {
        burger = (
        <Aux>
          <Burger ingredients= {this.props.ings}/>
          <BuildControls ingredientAdded={this.props.onIngredientAdded}
          ingredientRemove={this.props.onIngredientRemoved}
          disabled={this.disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered= {this.purchaseHandler}
          isAuth = {this.props.isAuthenticated}
          price={this.props.price} />
        </Aux>
        );
        orderSummary = <OrderSummary ingredients={this.props.ings}
        PurchaseCancelled={this.PurchaseCancelled}
        PurchaseContinued={this.PurchaseContinued}
        price={this.props.price}/>
      }
      if(this.state.loading) {
        orderSummary = <Spinner/>;
      }
    return (
      <Aux>
       <Modal
         show={this.state.purchasing}
         modlaClosed={this.purchaseCancelHandler}>
           {orderSummary}
       </Modal>
          {burger}
      </Aux>
    )
  }
}
const mapStateToProps = state => {
  debugger;
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated : state.auth.idToken !== null,
  }
}

const mapDispatchToProps = dispatch => {
  console.log("dispatch action",dispatch);
  debugger;
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredinets()),
    onRedirectPath: (path) => dispatch(actions.setRedirect(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,Axios));
