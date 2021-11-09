import React, { useEffect, useState} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummury from '../../components/Burger/OrderSummury/OrderSummury';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const BurgerBuilder = (props)=>{
    
    const [purchasing,setPurchasing] = useState(false);
    const {onInitIngredients} = props;
    useEffect(()=>{
        onInitIngredients();
    },[onInitIngredients]);

    const updatePurchaseState=(ingredients)=> {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key]
        })
        .reduce( (sum, el) => {
            return sum + el;
        },0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if(props.isAuth){
            setPurchasing(true); //!purchasing
        } else {
            props.history.push({
                pathname: '/auth'
            });
        }  
    } 

    const purchaseCancelhandler = () => {
        setPurchasing(false);
    }

    const purchaseContinuehandler = () => {  
        props.onPurchaseInit();
        props.history.push({
            pathname: '/checkout'
        });
    }

    const disableInfo = {
        ...props.ings
    }
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0 
    }
    let orderSummury = null;
    let burger = props.error ? <p style={{textAlign:'center', marginTop:'200px', fontSize: 'x-large'}}>ingrediants cant be loaded!</p> : <Spinner/> ;

    if (props.ings) {
        burger = 
            <Auxiliary>
                <Burger ingredients= {props.ings} />
                <BuildControls ingredientAdded={props.onAddIngredient} 
                ingredientRemoved={props.onRemoveIngredient} 
                disabled={disableInfo}
                price={props.price}
                purchasble={updatePurchaseState(props.ings)}
                purchasing={purchaseHandler}
                />
            </Auxiliary>;
        orderSummury = <OrderSummury ingredients={props.ings} price={props.price}
        purchaseCancelled={purchaseCancelhandler} 
        purchaseContinued={purchaseContinuehandler} />;
    }
    return(
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelhandler}>
                {orderSummury}
            </Modal>
            {burger}
        </Auxiliary>
    );
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient :(type)=> dispatch(actions.addIngrediant(type)),
        onRemoveIngredient : (type)=> dispatch(actions.removeIngrediant(type)),
        onInitIngredients :()=> dispatch(actions.initIngredients()),
        onPurchaseInit: ()=> dispatch(actions.purchaseInit())
  //     onSetAuthRedirectPath: path=>dispatch(actions.onSetAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios));