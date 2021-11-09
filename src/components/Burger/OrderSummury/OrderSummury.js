import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button';

const OrderSummury = (props) => {
    const ingrediantSummury = Object.keys(props.ingredients)
    .map(key => {
       return <li key={key}>
           <span style={{textTransform:'capitalize'}} >{key} </span>:{props.ingredients[key]}
            </li>
    }); 
    return (
        <Auxiliary>
            <h3>Your order</h3>
            <p>A delicious Burger with the following chosen tastetful ingredients</p>
            <ul>
                {ingrediantSummury}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to checkout</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
    )
}

export default OrderSummury
