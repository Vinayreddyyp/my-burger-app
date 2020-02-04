import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Orders Page</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;