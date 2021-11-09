import React, {  useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import {updateObject, checkValidity} from '../../../shared/utulity';

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength:4
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email : {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod : {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue:'Fastest'},
                    {value: 'cheapest', displayValue:'Cheapest'}
                ]
            },
            validation: {},
            value: 'fastest',
            valid: true
        },
    });
    const [formIsValid,setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
       const postFormData = {};
       for (let formElementName in orderForm) {
           postFormData[formElementName] = orderForm[formElementName].value;
       }
       const order = {
           ingrediants : props.ings,
           price : props.price,
           orderData: postFormData,
           userId: props.userId
       };
       props.onPurchaseBurger(order,props.token);
    };

    const inputChangedHandler = (event, inputIdentifier) =>{
        const updatedFormElement = updateObject(orderForm[inputIdentifier],{
            value : event.target.value,
            valid : checkValidity(event.target.value , orderForm[inputIdentifier].validation),
            touched : true
        })
        const updatedOrderForm = updateObject(orderForm,{
            [inputIdentifier] : updatedFormElement
        });
    
        let formValid = true;
        for (let el in updatedOrderForm){
            formValid = updatedOrderForm[el].valid && formValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formValid);
    };
    
    const formElementArray = [];
    for (let key in orderForm) {
        formElementArray.push({
            id:key,
            config: orderForm[key]
        });
    };
    let form = (
    <form onSubmit={orderHandler}>
        {formElementArray.map(el => (
            <Input key={el.id}
            elementType={el.config.elementType} 
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={(event) => inputChangedHandler(event,el.id)}
            invalid = {!el.config.valid }
            shouldValidate= {el.config.validation}
            touched= {el.config.touched}
            />
        ))}
        <Button btnType="Success" disabled={!formIsValid} >ORDER</Button>
    </form>
    );
    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>enter your contact data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const dispatchStateToProps = dispatch =>{
    return {
        onPurchaseBurger : (order, token) => dispatch(actions.purchaseBurger(order, token))
    };
};
export default connect(mapStateToProps,dispatchStateToProps)(withErrorHandler(ContactData, axios));