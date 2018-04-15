import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

import HomePage from '../pages/home';
import Login from '../components/loginForm';
import Register from '../components/registerForm';
import Logout from '../components/logout';
import EditUserForm from '../components/editUserForm';
import Transaction from '../components/transaction';

import Dashboard from '../pages/admin/dashboard';
import ProjectNew from '../pages/admin/projectCreate';
import Projects from '../pages/projects';
import UserProjects from '../pages/user-projects';
import UserBids from '../pages/user-bids';
import SingleProject from '../pages/singleproject';

import NotFound from '../pages/notfound';
import NotAllowed from '../pages/notallowed';


const Router = () => (

   <BrowserRouter>
   		<Switch>
   			<Route exact path="/" component={HomePage} />
   			
   			<Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
   				
            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/project/create" component={ProjectNew} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/:slug" component={SingleProject} />

            <Route exact path="/user/projects" component={UserProjects} />
            <Route exact path="/user/bids" component={UserBids} />
            <Route exact path="/user/profile" component={EditUserForm} />
            <Route exact path="/user/transactions" component={Transaction} />


            <Route exact path="/notallowed" component={NotAllowed} />

            <Route component={NotFound} />

   		</Switch>
   </BrowserRouter>

)

export default Router;