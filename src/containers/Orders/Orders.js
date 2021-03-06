import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import axios from '../../axiosOrder';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends  Component {

    componentDidMount() {
        // console.log("Orders props", this.props);
        // axios.get('./orders.json')
        //  .then(res => {
        //      const fetchOrders = [];
        //      for(let key in res.data) {
        //         fetchOrders.push({...res.data[key], id: key})
        //      }
        //       this.setState({loading: false, orders: fetchOrders});;
        //      console.log("Res orders", res.data);
        //  }).catch(err =>{
        //     console.log("err", err);
        //     this.setState({loading: false});
        //  })
        
        this.props.onFetchOrders(this.props.token)
    }
     render() {

        let orders = <Spinner/>

        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                  key={order.id}
                  ingredients= {order.ingredients}
                  price={order.price}/>
            ))
        }
         
         return (
            <div>
              {orders}
            </div>
          
         )
     }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(action.fetchOrders(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));