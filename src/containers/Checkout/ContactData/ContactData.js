import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from  '../../../store/actions/index';

class ContactData  extends Component {
   
    state = {
        orderForm: {
            name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'vinay',
                placeholder: 'your Name',
            },
            value: '',
            validation : {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your email',
            },
            value: '',
            validation : {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        address: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'enter your street',
            },
            value: '',
            validation : {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'vinay',
                placeholder: 'enter your Zip Code',
            },
            value: '',
            validation : {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'enter your country',
            },
            value: '',
            validation : {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fast', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: '',
            validation: {},
            valid: true,
     
         },
        },
        formIsValid: false,

    };


    orderHandler = (event) => {
        event.preventDefault();
        console.log("order handler triggered", this.props.ingredients);
         const formData = {};
         for(let formElementIdentifier in this.state.orderForm) {
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
         }
         console.log("formdata", formData);


         const order = {
            Ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
         }

         this.props.onOrderBurger(order);
         

        // const order = {
        // Ingredients: this.props.ings,
        // price: this.props.price,
        // orderData: formData,
        // customer: {
        //     name: 'vinay',
        //     address: {
        //     street: 'street1',
        //     zipCode: '12344',
        //     country: 'anakapalli'
        //     },
        //     email: 'test@test.com'
        // },
        // deliveryMethod: 'fastest'
        // }
        // console.log("contactData", order);
        // Axios.post('/orders.json', order)
        // .then(response => {
        // this.setState({loading: false})
        // this.props.history.push('/');
        // console.log("response", response);
        // }).catch(error => {
        // this.setState({loading: false});
        // });
    };

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        };
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) => {

      const updatedOrderForm = {
          ...this.state.orderForm
      };
      const updatedFormElement =  {
          ...updatedOrderForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

       let  formIsValid = true;
       for(let inputIdentifier in updatedOrderForm) {
           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }
   
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

     render () {
         const formElementArray = [];
         for(let key in this.state.orderForm) {
               formElementArray.push({
                   id: key,
                   config:this.state.orderForm[key]});
         }
         let form = (
          <form onSubmit={this.orderHandler}>
            {formElementArray.map(formElement => (
            <Input 
               key={formElement.id}
                elementType={formElement.config.elementType}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          </form>
         )
         if(this.props.loading) {
             form = <Spinner/>;
         }

         return (
             <div className={classes.ContactData}>
              <h4>Enter your contact data</h4>
              {form}
             </div>
         )
       }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
     return {
         onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));