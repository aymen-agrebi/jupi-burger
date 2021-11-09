import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const Checkout = React.lazy(()=>{
  return import('./containers/Checkout/checkout');
});
const Orders = React.lazy(()=>{
  return import('./containers/Orders/Orders');
});
const Auth = React.lazy(()=>{
  return import('./containers/Auth/Auth');
});

const App = (props) => {
  const {ontryAutoSignin} = props;
  useEffect(()=>{
    ontryAutoSignin();
  },[ontryAutoSignin]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props)=><Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth){
    routes =(
      <Switch>
        <Route path="/checkout" render={(props)=><Checkout {...props} />} />
        <Route path="/orders" render={(props)=><Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props)=><Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch> 
  );
  };
  
  const TITLE = 'burger builder';
  return (
    <div>
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>
      <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return{
    ontryAutoSignin : ()=> dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
