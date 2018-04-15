import React from "react";
import {rBridge,ajax} from '../helpers/helpers';


class Header extends React.Component {

  logout = (e) => {
     e.preventDefault();

     ajax({},function(r){

        window.location.href=  '/logout';

     },'/logout')

  }

	render() {

    let nav;

    if(this.props.userLoggedIn === true) {

       nav = ( <div id="main-area">
                    
                     <div className="user-menu-bar">
                        <a href="/dashboard" className='has-dropdown'><span>Hi, {this.props.user.first_name}</span> </a>
                          <ul className="submenu">
                              <li><a href="/user/projects">My Projects</a></li>
                              <li><a href="/user/bids">My Bids</a></li>
                              <li><a href="/user/profile">Profile</a></li>
                           </ul>
                     </div> 
                     <a href="/logout" onClick={this.logout} className="logout-btn"><svg  x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24"><g fill="#999999"><path data-cap="butt" data-color="color-2" fill="none" stroke="#999999" strokeWidth="2" strokeMiterlimit="10" d="M8.1,16c1.4,2.4,4,4,6.9,4 c4.4,0,8-3.6,8-8s-3.6-8-8-8c-3,0-5.5,1.6-6.9,4" strokeLinejoin="miter" strokeLinecap="butt"></path> <line data-cap="butt" fill="none" stroke="#999999" strokeWidth="2" strokeMiterlimit="10" x1="16" y1="12" x2="2" y2="12" strokeLinejoin="miter" strokeLinecap="butt"></line> <polyline fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="5,15 2,12 5,9 " strokeLinejoin="miter"></polyline></g></svg></a>
                     <span className="badge badge-lg badge-pill badge-tertiary text-uppercase">$ {this.props.user.balance}</span>
                     <a href="/dashboard" className="dashboard-btn">Dashboard</a>
                 </div>    );

    } else {

      nav = ( <div id="main-area">
                                                                     
                                   <a href="/login" className="btn btn-primary">Login</a>
                                   <a href="/register" className="btn btn-secondary">Register</a>
                                  
                            </div>
                            );

    }

		return (

                
               <div id="main-bar">
         
                <div className="container">
                    
                    <div className="row">
                        <div className="col-5 col-md-3">
                             <a href="/" id="logo"><img src=" /css/i/logo.png" alt="" /></a>
                        </div>
                        
                        <div className="col-7 col-md-9">
                            
                                
                            <nav id="main-menu">
                                <ul className='clearfix'>
                                    <li><a href="/" className='has-dropdown'>Home</a></li>
                                    <li><a href="/projects">Projects</a></li>
                                    
                                </ul>
                            </nav>      

                            {nav}

                            

                        </div>   
                        
                        
                    </div>

                    </div>


                </div> );

	}

}



export default rBridge(Header);

