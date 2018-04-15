import React from "react";
import {rBridge} from '../helpers/helpers';

class DashboardTabbedNavStub extends React.Component {


	render() {
	
	if(this.props.guest === true)
		return null;

		return (
                
                <div id="admin-title-bar">
			      <div className="container">
			        <div className="row">
			            <div className="col-8">
			               
			               <ul id="admin-tabs" className='clearfix'>
			                  <li className={ (this.props.path === '/dashboard') ? 'active' : '' }><a href="/dashboard">Dashboard</a></li>
			                  <li className={ (this.props.path === '/user/projects') ? 'active' : '' }><a href="/user/projects">My Projects</a></li>
			                  <li className={ (this.props.path === '/user/bids') ? 'active' : '' }><a href="/user/bids">My Bids</a></li>
			                  <li className={ (this.props.path === '/user/profile') ? 'active' : '' }><a href="/user/profile">Profile</a></li>
			                  <li className={ (this.props.path === '/user/transactions') ? 'active' : '' }><a href="/user/transactions">Transactions</a></li>
			               </ul> 

			            </div>  
			            <div className="col-4">
			             	<a href="/project/create" className="btn btn-primary">Create Project</a>	
			            </div>
			        </div>
			       </div>
			    </div>   

		);

	}

}


const DashboardTabbedNav = rBridge(DashboardTabbedNavStub); 

export default DashboardTabbedNav;
