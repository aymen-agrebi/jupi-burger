import React from "react";
import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            value: props.ingredients[ingName]
        });
    }

    const ingOutput = ingredients.map(ing =>{
        return <span 
        style={{textTransform:'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc'}}
        key={ing.name} >{ing.name} ({ing.value}) </span>;
    });
  
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput} </p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}
export default Order;