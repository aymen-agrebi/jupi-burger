import {React} from 'react';
import { connect } from 'react-redux';
import classes from './Burger.module.css';
import BurgerIngrediants from './BurgerIngrediants/BurgerIngrediants';

//import { array } from 'prop-types';

const Burger = (props) => {
    const arrayIgkeys = Object.keys(props.ingredients);

    let arrayIngredients = arrayIgkeys.map(igKey => {
            return [...Array(props.ingredients[igKey])]      
           .map((_, i) => {
               return <BurgerIngrediants key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        if (arrayIngredients.length === 0){
            arrayIngredients = <p>Please start adding ingredients</p>
        }    

    return (
        <div className={classes.Burger} > 
            <BurgerIngrediants type="bread-top"/>
            {arrayIngredients}
            <BurgerIngrediants type="bread-bottom"/>
        </div>
    )  
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};
export default connect(mapStateToProps)(Burger);