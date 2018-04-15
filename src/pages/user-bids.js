import React from "react";
import DashboardTabbedNav from "../components/dashboardTab.js";
import {ajax,rBridge} from '../helpers/helpers';

import Moment from 'react-moment'; 

class UserBids extends React.Component {
  
  state = { bids : [] } 
  
  componentDidMount() {
      

      let obj = this;
      ajax({ filter: { user : true }   },function(response){

        obj.setState({ bids : response.bids });

      },"/api/v1/bids",'get');

  }

	render() {

    let b=this.state.bids;

    let bids = [];

    for(var i=0;i<b.length;i++) {

      var bid = b[i];
      var perma = '/project/'+bid.project.slug;
      

      bids[i]  = (<tr key={i} className="bg-white" ><td><a href={perma} className="h5">{bid.project.name}</a></td><td>${bid.price}</td><td><Moment fromNow>{bid.createdAt}</Moment></td><td><span className="badge badge-lg badge-pill badge-secondary text-uppercase">{bid.project.status}</span></td></tr>)

    }
     

		return (
                
               <div className="project-create-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                            

                            <div className="col-12 col-lg-12">
                                

                                 <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Your Latest Bids</h3>
                                    </div>

                                    <div className="fr-widget-body no-padding">
                                        
                                       <div className="single-project-description">
                                            <table>
                                               <thead>
                                                 <tr>
                                                    <th scope="col">Project</th>
                                                    <th scope="col">Bid</th>
                                                    <th scope="col">Bid On</th>
                                                    <th scope="col">Status</th>
                                                 </tr>
                                               </thead>
                                               <tbody>
                                                  {bids}
                                               </tbody>
                                            </table>
                                       </div>

                                    </div>

                               </div>


                            </div> 


                      </div>
                    </div>

                </div>
           </div> 
  

		);
  

	}

}

export default rBridge(UserBids);

