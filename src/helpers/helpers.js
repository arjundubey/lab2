import axios from 'axios';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index.js';

/**
 * Custom ajax handler to make things easier.
 */
export function ajax(opts,callback, url = '/ajax', request = 'post') {

	 const config = { headers: { 'Content-Type': 'application/json' } };

  var r = axios[request]; 

  if( request === 'get' ) {
     opts = { params:opts };
  }

	r(url,opts,config )
    
    .then(function (response) {

    	callback(response.data,response.status);       

    });
};


/**
 * Custom ajax handler to make things easier.
 */
export function ajaxMultiparts(url,form,callback, request = 'post') {

  var tempFormData = new FormData(form);

  const config = { headers: {'Content-Type': 'multipart/form-data' }};

  var r = axios[request]; 

  r(url,tempFormData,config )
    
    .then(function (response) {

      callback(response.data,response.status);       

    });
};



/**
 * Get all inputs from form
 */

export function formHandler(form){

	var data = {};

    var inputs = form.querySelectorAll('input,textarea,select');

    for(var i=0;i<inputs.length;i++) {
       if(inputs[i].value!=='')
          data[inputs[i].name] = inputs[i].value.trim();
    }

    
    return data;

}

/**
 * React - Redux Bridge
 */

export function rBridge(component) {


    function mapStateToProps(state) { 

          return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn };
    } 

    function mapDispatchToProps(dispatch) { 

        return bindActionCreators(actions,dispatch);
     } 

    return connect(mapStateToProps,mapDispatchToProps)(component); 

}