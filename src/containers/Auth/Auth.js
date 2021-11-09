import { React, useState } from "react";
import { connect } from "react-redux";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from "react-router";
import { updateObject, checkValidity } from "../../shared/utulity";

const Auth = (props) => {
    const [controls, setControls] = useState({
        email: {
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
            valid:false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid:false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);
    /*
    useEffect(()=>{
        if (!props.isBurgerBuilder && props.authRedirectPath !== '/' ){
            props.onSetAuthRedirectPath();
        }
    },[]);
    */

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls,{
            [controlName] : updateObject(controls[controlName],{
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, controls[controlName].validation)
            })
        });
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthModeHandler = () =>{
        setIsSignUp(!isSignUp);
    }

    const formElementArray = [];
    for (let key in controls) {
        formElementArray.push({
            id:key,
            config: controls[key]
        })
    }
    let form = 
    <form onSubmit={submitHandler}>
    {formElementArray.map(el =>(
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
    <Button btnType="Success">SUBMIT</Button>
    </form>;

    if (props.loading) {
        form= <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message} </p>
        );
    }
    let redirectAuth= null;
    if (props.isAuth ){
        if (props.isBurgerBuild){
            redirectAuth = <Redirect to={"/checkout"} />;
        }else{
            redirectAuth = <Redirect to={"/"} />;
        }
    }

    return(
        <div className={classes.Auth}>
            {redirectAuth}
            {errorMessage}
            <h1>{isSignUp ? 'Sign Up' : 'Sign In' }</h1>
            {form}
            <Button btnType="Danger"
            clicked={switchAuthModeHandler}
            >SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token,
        isBurgerBuild: state.burgerBuilder.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,signUp) => dispatch(actions.auth(email,password,signUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);