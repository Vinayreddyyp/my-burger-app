import React from 'react';
import classes from './Input.css'

const Input = (props) => {
    console.log("props of input", props);
    console.log("props.invalid ", props.invalid )
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    
    console.log("props.elementType", props.elementType);
    switch(props.elementType) {
        
        case('input'):
        
         inputElement = <input 
            onChange = {props.changed}
            className={inputClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value}/>
         break;
         case('textarea'):
            inputElement = <textarea 
              onChange = {props.changed}
              className={inputClasses.join(' ')}  
              {...props.elementConfig}
              value={props.value}/>
         break;
         case('select'):
            inputElement = (
            <select  className={inputClasses.join(' ')} 
                    value={props.value}     
                    onChange={props.changed}>
                  {props.elementConfig.options.map(option => (
                      <option key={option.value} value={option.value}>
                      {option.displayValue}
                      </option>
                  ))}
              </select>
             
            );


         break;
         default:
             inputElement = <input 
             className={inputClasses.join('')}
             {...props.elementConfig}
             value={props.value}/>
    };

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;
