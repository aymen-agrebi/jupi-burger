import classes from './Layout.module.css';
import React, { useState} from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawaerClosedHandler = () => {
        setShowSideDrawer(false);
    }
    const sideDrawaerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Auxiliary>
        <div>
            <Toolbar toggle={sideDrawaerToggleHandler} isAuth={props.isAuth} />
            <SideDrawer  
            open={showSideDrawer} 
            closed={sideDrawaerClosedHandler}
            isAuth={props.isAuth}/>
        </div>
        <main className={classes.Content} >
            {props.children}
        </main>
        </Auxiliary>
    )
} 
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token
    }
}
export default connect(mapStateToProps)(Layout);
