import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrder';

class Orders extends  Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('./orders.json')
         .then(res => {
             const fetchOrders = [];
             for(let key in res.data) {
                fetchOrders.push({...res.data[key], id: key})
             }
              this.setState({loading: false, orders: fetchOrders});;
             console.log("Res orders", res.data);
         }).catch(err =>{
            console.log("err", err);
            this.setState({loading: false});
         })
    }
     render() {
         return (
            <div>
              {this.state.orders.map(order => (
                  <Order 
                    key={order.id}
                    ingredients= {order.ingredients}
                    price={order.price}/>
              ))}
            </div>
          
         )
     }
};
export default Orders;