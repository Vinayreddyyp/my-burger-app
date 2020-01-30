import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axiosOrder';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
   meat: 1.25,
   salad: 0.5,
   cheese: 0.3,
   bacon: 0.7
};


class BurgerBuilder extends Component {
  state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
  }

  componentDidMount() {
     axios.get('https://react-my-burger-8b57a.firebaseio.com/ingredients.json')
     .then(response => {
         this.setState({ingredients : response.data});
     }).catch(error => {
       this.setState({ error: error});
     })
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
    // this.setState({loading: true})
    // const order = {
    //    Ingredients: this.state.ingredients,
    //    price: this.state.totalPrice,
    //    customer: {
    //      name: 'vinay',
    //      address: {
    //        street: 'street1',
    //        zipCode: '12344',
    //        country: 'anakapalli'
    //      },
    //      email: 'test@test.com'
    //    },
    //    deliveryMethod: 'fastest'
    // }
    // Axios.post('/orders.json', order)
    // .then(response => {
    //   this.setState({loading: false, purchasing: false})
    //    console.log("response", response);
    // }).catch(error => {
    //   this.setState({loading: false, purchasing: false});
    // })
    const queryParams = [];
    for(let i in this.state.ingredients) {
        console.log("i in ingredents", i);
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    };
    const queryString = queryParams.join('&');
    console.log("queryParams", queryParams);
        this.props.history.push({
         pathname: '/checkout',
         search: '?' + queryString
        });
  }
  render() {
    const disabledInfo = { ...this.state.ingredients }
      for(let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;

      let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>

      if (this.state.ingredients) {
        burger = (
        <Aux>
          <Burger ingredients= {this.state.ingredients}/>
          <BuildControls ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={this.disabledInfo}
          purchasable={this.state.purchasable}
          ordered= {this.purchaseHandler}
          price={this.state.totalPrice} />
        </Aux>
        );
        orderSummary = <OrderSummary ingredients={this.state.ingredients}
        PurchaseCancelled={this.PurchaseCancelled}
        PurchaseContinued={this.PurchaseContinued}
        price={this.state.totalPrice}/>
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

export default withErrorHandler(BurgerBuilder,Axios);
