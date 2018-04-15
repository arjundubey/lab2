import React, { Component } from 'react';
import Router from './components/Router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/index.js';

import {ajax} from './helpers/helpers';

import Header from './layout/header';
import Footer from './layout/footer';

class AppStub extends Component {

  componentWillMount() { 

    let obj = this;
    ajax({},function(response){

        let u = {};

        if("user" in response)
          u = response.user;
        

          obj.props.manageSession(response.logged,u);
          
        

    },'/session');

  } 

  render() {
    return (
      <div className="App">
       <Header />
        <Router />
       <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) { 

    return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn };
 } 

function mapDispatchToProps(dispatch) { 

    return bindActionCreators(actions,dispatch);
 } 

const App = connect(mapStateToProps,mapDispatchToProps)(AppStub); 

export default App;

