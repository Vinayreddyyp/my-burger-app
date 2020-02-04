import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData  extends Component {
   
    state = {
        name: '',
        email: '',
        address: {
            streetName: '',
            postalCode: ''
        }
    };
    orderHandler = (event) => {
        event.preventDefault();
        console.log("order handler triggered", this.props.ingredients);
        this.setState({loading: true})
        const order = {
        Ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
            name: 'vinay',
            address: {
            street: 'street1',
            zipCode: '12344',
            country: 'anakapalli'
            },
            email: 'test@test.com'
        },
        deliveryMethod: 'fastest'
        }
        console.log("contactData", order);
        Axios.post('/orders.json', order)
        .then(response => {
        this.setState({loading: false})
        this.props.history.push('/');
        console.log("response", response);
        }).catch(error => {
        this.setState({loading: false});
        });
    }

     render () {
         let form = (
          <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="text" name="email" placeholder="Your Mail"/>
            <input className={classes.Input} type="text" name="street" placeholder="street Name"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
          </form>
         )
         if(this.state.loading) {
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

export default ContactData;