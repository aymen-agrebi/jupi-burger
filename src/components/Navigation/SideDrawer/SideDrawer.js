import classes  from './SideDrawer.module.css'
import React from 'react'
import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open] ;
    }
    return (
        <Auxiliary>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
             <Logo/>
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </div>
        </Auxiliary>
    )
}

export default SideDrawer
