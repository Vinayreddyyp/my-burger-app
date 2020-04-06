import React, { Component } from 'react';
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button'
class Auth extends Component {
    state = {
        controls:  {
            name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'vinay',
                placeholder: 'your Email',
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
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'vinay',
                placeholder: 'Enter your password',
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
       
    },
    formIsValid: false
}

onsubmitHandler = (event) => {
    event.preventDefault();

   const formData = {};
    for( let formElementIdentifier in this.state.controls) {
        formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
    }
     console.log("from data", formData);
}

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

onHandleChange(event, inputIdentifier) {
    console.log("event", event.target.value);
    const updatedOrderForm = {...this.state.controls}
    const updatedFormElem = {
        ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElem.value = event.target.value;
    updatedFormElem.valid = this.checkValidity(updatedFormElem.value, updatedFormElem.validation)
    updatedOrderForm[inputIdentifier] = updatedFormElem;
    

    let  formIsValid = true;
       for(let inputIdentifier in updatedOrderForm) {
           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }
   


    this.setState({controls: updatedOrderForm, })

}
    render () {
        const formElementArray = [];
        console.log("auth form element", formElementArray)
        for(let key in this.state.controls) {
            console.log("auth id", key);
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
                
                formElementArray.map(formElem => {
                    return <Input 
                            key={formElem.id}
                            changed= {(event) => this.onHandleChange(event, formElem.id)}
                            elementType={formElem.config.elementType}
                            invalid={!formElem.config.valid}
                            elementConfig={formElem.config.elementConfig}
                            value={formElem.config.value}/>
                })
                
            
        )

        return (
            <div className= {classes.Auth}>
                <form onSubmit= {this.onsubmitHandler}>
                {form}
                <Button btnType="Success" disable={!this.state.formIsValid}>SUBMit</Button>
                </form>
            </div>
        )
    }
}
export default Auth;