import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
   <div className={classes.BuildControls}>
     <p> currentPrice: {props.price} </p>
      {controls.map(ctrl => (
        <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={ () => props.ingredientAdded(ctrl.type)}
        remove= { () => props.ingredientRemove(ctrl.type)}
        disabled={ () => props.disabled[ctrl.type]} />
      ))}
      <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'Sign up for the order'} </button>
   </div>
)
export default buildControls;
