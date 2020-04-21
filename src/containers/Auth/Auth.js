import React, { Component } from 'react';
import classes from './Auth.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls:  {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
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
                    minLength: 6,
                    maxLength: 6,
                },
                valid: false,
                touched: false,
            },

            
           
        },
        isSignup : true,
       
    };


componentDidMount() {
  console.log("this.props.building", this.props.building);
  console.log("this.props.authRedirect", this.props.authRedirect);
    if(!this.props.building && this.props.authRedirect !== '/') {
        this.props.onSetAuthRedirect();
    }

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
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;

}

onHandleChange(event, inputIdentifier) {
    console.log("event", event.target.value);

     const updatedControlsForm = {
         ...this.state.controls,
        [inputIdentifier]: {
            ...this.state.controls[inputIdentifier],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
            touched: true,
        }
     }
     this.setState({controls: updatedControlsForm})

    // const updatedOrderForm = {...this.state.controls}
    // const updatedFormElem = {
    //     ...updatedOrderForm[inputIdentifier]
    // }
    // updatedFormElem.value = event.target.value;
    // updatedFormElem.valid = this.checkValidity(updatedFormElem.value, updatedFormElem.validation)
    // updatedOrderForm[inputIdentifier] = updatedFormElem;
    

    // let  formIsValid = true;
    //    for(let inputIdentifier in updatedOrderForm) {
    //        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    //    }
   


    // this.setState({controls: updatedOrderForm, formIsValid: formIsValid})

}

onSubmitHandler = (event) => {
    event.preventDefault();
    debugger;

    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

//    const formData = {};
//     for( let formElementIdentifier in this.state.controls) {
//         formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
//     }
    //  console.log("from data", formData);
}

switchAuthHandler = () => {
    this.setState(prevState => {
        return {
            isSignup : !prevState.isSignup
        }
    })
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
                            touched={formElem.config.touched}
                            shouldValidate={formElem.config.validation}
                            elementConfig={formElem.config.elementConfig}
                            value={formElem.config.value}/>
                })
                
            
        )

        if(this.props.loading) {
            console.log('spinner triggered', this.props.loading)
            form = <Spinner/>
        }
       
        let errorMessage = null;
        if(this.props.error) {
           errorMessage = (
               <p>{this.props.error.message}</p>
           )
        }

        let authRedirect = null;
        if(this.props.authentication) {
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }



        return (
            <div className= {classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit= {this.onSubmitHandler}>  
                {form}
                <Button btnType="Success" disable={!this.state.formIsValid}>SUBMit</Button>
                <Button btnType="Danger" clicked={this.switchAuthHandler}>
                    Click me {this.state.isSignup ? 'signin' : 'signup'}</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect,
        authentication: state.auth.idToken !==null,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password, isSignup) => dispatch(actions.auth(email,password, isSignup)),
        onSetAuthRedirect: () => dispatch(actions.setRedirect('/')),
    }

}

export default connect(mapStateToProps,mapDispatchToProps) (Auth);

