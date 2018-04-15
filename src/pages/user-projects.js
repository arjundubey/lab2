import React from "react";
import DashboardTabbedNav from "../components/dashboardTab.js";
import {ajax,rBridge} from '../helpers/helpers';

import Moment from 'react-moment';

class UserProjects extends React.Component {
  
  state = { projects : [] , max :0 , page : 1 } 
  
  paginate = (e) => {

      e.preventDefault();

     
      let obj = this;
      
      

      ajax({ page : e.target.dataset.paginate, filter: {  user : true } },function(response){


        obj.setState({ projects : response.projects, page : response.page, max: response.max });

      },"/api/v1/projects","get");
  }

  search = (e) => {
     e.preventDefault();

      let obj = this;
      
      var filter = { s : this.searchform.querySelector('.s').value ,  user : true };

      ajax({ filter } ,function(response){

        obj.setState({ projects : response.projects, page : response.page, max: response.max });

      },"/api/v1/projects","get");

  }

  componentDidMount() {
      


      let obj = this;
      ajax({ filter: { user : true }   },function(response){

        obj.setState({ projects : response.projects , page : response.page, max: response.max});

      },"/api/v1/projects","get");

  }

	render() {

     let items = [],t,cl;
    var pagination = [];



    for(var i=1;i<this.state.max;i++) {
      
      cl = ' page-item ';

      if(this.state.page == i)
        cl += ' active ';  

      pagination.push(<li key={'p'+i} className={cl}><a onClick={this.paginate} className="page-link" data-paginate={i} href={i}>{i}</a></li>);
                         
    }

    for(var i=0;i<this.state.projects.length;i++) {
      
      t = this.state.projects[i];
             var slug = '/projects/'+t.slug; 
      var k = "pr"+i;       
      items[i] = (
        <li key={k} className="clearfix">
                                        
            <div className="icon-li">
                <img src="/css/i/idea.png" alt="" />
            </div>


            <div className="desc-li">
                <h3><a href={slug}>{t.name}</a></h3>
                <div className="text">{t.description}</div>
            </div>

            <div className="bids-li">{t.bids.length}</div>
            
            <div className="started-li"><span className="date"><Moment fromNow>{t.createdAt}</Moment></span></div>                        
            
            <div className="range-li">${t.min_budget} - ${t.max_budget}</div>                

        </li>
        );

    }

		return (
                
               <div className="project-create-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                            

                            <div className="col-12 col-lg-12">

                             <div className="fr-widget">
                          <div className="fr-widget-body">
                              
                              <form ref={(f) => {this.searchform = f;} } onSubmit={this.search} action="">
                                    <div className="input-group">
                                        <input type="text" className="form-control s" placeholder="Search by name or skills" aria-label="Search by name or skills" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </div>
                                    </div>
                              </form>

                          </div>

                     </div>
                     

                     <div className="project-widget">
                        
                          <div className="project-widget-body">
                              
                                <ul className="project-lists-header clearfix">
                                        <li className='icon-li'></li>             
                                        <li className='desc-li'>Description</li>             
                                        <li className='bids-li'>No of Bids</li>             
                                        <li className='started-li'>Started At</li>             
                                        <li className='range-li'>Price Range</li>             
                                </ul>    
                                <ul className="project-lists clearfix">
                                    

                                    {items}


                                </ul>

                          </div>

                     </div>


                    <div className="project-widget">
                         <nav aria-label="Page navigation">
                          <ul className="pagination">
                           
                             {pagination}
                           
                          </ul>
                        </nav>
                     </div>



                 </div> 

                       



                      </div>
                    </div>

                </div>
           </div> 
  

		);

	}

}

export default rBridge(UserProjects);

