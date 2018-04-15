import React from "react";
import DashboardTabbedNav from "../../components/dashboardTab.js";
import {ajax,rBridge} from '../../helpers/helpers';

class Dashboard extends React.Component {
  
  state = { projects : [] , projects1: [] } 
  
  componentDidMount() {
    
      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');    
          }
    
      },1400);


      ajax({ filter: { bid_winner : true  }   },function(response){

        obj.setState({ projects : response.projects });

      },"/api/v1/projects","get");


      ajax({  },function(response){

        obj.setState({ projects1 : response.projects });

      },"/api/v1/bidprojects","get");

  }

  createItem = (t,i) => {

   
     var slug = '/projects/'+t.slug; 
    
      var avatar = '';
      


      if(typeof t.winner_id === "undefined") 
        return null;


          if( t.winner_id.avatar === ""){
            avatar = <span className="avatar bg-purple">{t.winner_id.first_name}+""{t.winner_id.last_name}</span>
          } else {
            avatar = <img alt="avatar" src={"/uploads/"+t.winner_id.avatar} className="avatar avatar-lg mr-3" />
          }


     return (
        <a href={slug} key={"db"+i} className="list-group-item list-group-item-action d-flex align-items-center">
            <div className="list-group-img">
                {avatar}
            </div>
            <div className="list-group-content">
                <div className="list-group-heading">{t.name} <small style={{color:'#fff',fontWeight:600}} className="badge badge-md badge-pill badge-primary text-uppercase">Estimated Time : {t.winner_bid.time} days, Price: ${t.winner_bid.price}</small></div>
                <p className="text-sm">User {t.winner_id.first_name} is working on it.</p>
            </div>
        </a>
        );

  }


 createItem1 = (t,i) => {

   
     var slug = '/projects/'+t.slug; 
    
      var avatar;
      if(typeof t.owner.avatar === "undefined" || t.owner.avatar === ""){
        avatar = <span className="avatar bg-purple">{t.owner.first_name[0]}{t.owner.last_name[0]}</span>
      } else {
        avatar = <img alt="avatar" src={"http://localhost:3000/uploads/"+t.owner.avatar} className="avatar avatar-lg mr-3" />
      }

     return (
        <a href={slug} key={"db"+i} className="list-group-item list-group-item-action d-flex align-items-center">
            <div className="list-group-img">
                {avatar}
            </div>
            <div className="list-group-content">
                <div className="list-group-heading">{t.name} </div>
               
            </div>
        </a>
        );

  }
  
  
	render() {

    let items = [],t,items1 = [];

     for(var i=0;i<this.state.projects.length;i++) {

      items[i] = this.createItem(this.state.projects[i],i);
    }

     for(var i=0;i<this.state.projects1.length;i++) {

      items1[i] = this.createItem1(this.state.projects1[i],i);
    }

		return (
                
               <div className="dashboard-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                               

                               <div className="col-12 col-lg-8">
                                   
                                   <div className="card mb-3">
                                    <div className="card-header py-4">
                                        <div className="d-flex align-items-center">
                                            <h4 className="heading h5 mb-0">Ongoing Projects</h4>
                                        </div>
                                    </div>
                                    <div className="list-group">
                                       {items}
                                    </div>
                                    </div>


                                    <div className="card">
                                    <div className="card-header py-4">
                                        <div className="d-flex align-items-center">
                                            <h4 className="heading h5 mb-0">Projects I have bid</h4>
                                        </div>
                                    </div>
                                    <div className="list-group">
                                       {items1}
                                    </div>
                                    </div>
                               </div> 
                               

                               <div className="col-12 col-lg-4">
                                    
                                    <div className="fr-widget">
                                       
                                        <div className="title">
                                            <h3>Widget</h3>
                                        </div>

                                        <div className="fr-widget-body">
                                            
                                            <div className="text-widget">
                                       
                                                <h3 className='highlight'><span className="font-weight-600">Millions</span> of small businesses use Freelancer to turn their ideas into reality. </h3>
                                                
                                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et libero vulputate, <strong>ollicitudin enim vitae</strong>, varius nisl. Cras maximus diam mauris, mattis euismod felis pretium quis. Cras auctor mauris vitae commodo fringilla. Sed fringilla urna quis eleifend convallis.</p>
                            
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

export default rBridge(Dashboard);

