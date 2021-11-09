import React from "react";
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses= [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} />;
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value}/>;
            break;
        case('select'):
            inputElement = <select className={inputClasses.join(' ')} onChange={props.changed} value={props.value}>
                {props.elementConfig.options.map(opt =>(
                    <option key={opt.value} value={opt.value} onChange={props.changed} >{opt.displayValue} </option>
                ))}
            </select> ;
            break;    
        default:  
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label} </label>
            {inputElement}
        </div>
    );
}

export default Input;