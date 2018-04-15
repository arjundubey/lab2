import React from "react";
import Slider from '../components/slider';
import {ajax,rBridge} from '../helpers/helpers';

import Moment from 'react-moment';

class HomePage extends React.Component {

   state = {
    projects : [] , max :0 , page : 1,
    projects1 : [] , max1 :0 , page1 : 1

    } 
  
  componentDidMount() {

      let obj = this;
      ajax({ filter:{ status:"OPEN"} },function(response){
        obj.setState({ projects : response.projects, page : response.page, max: response.max });
      },"/api/v1/projects","get");

      /**
       * Relevant Projects
       */

       ajax({ filter:{ status:"OPEN"} },function(response){

        if(response.projects)
        obj.setState({ projects1 : response.projects, page1 : response.page, max1: response.max });
      },"/api/v1/projects/relevant","get");

  }

  paginateAll = (e) => {

      e.preventDefault();

     
      let obj = this;
      ajax({ filter:{ status:"OPEN"}, page : e.target.dataset.paginate },function(response){

        obj.setState({ projects : response.projects, page : response.page, max: response.max });

      },"/api/v1/projects","get");
  }

  searchAll = (e) => {
     e.preventDefault();

      let obj = this;
      
      var filter = { status:"OPEN" ,s : this.searchform.querySelector('.s').value };

      ajax({ filter } ,function(response){

        obj.setState({ projects : response.projects, page : response.page, max: response.max });

      },"/api/v1/projects","get");

  }


  paginateRelevant = (e) => {

      e.preventDefault();
     
      let obj = this;
      ajax({ filter: { status:"OPEN" }, page : e.target.dataset.paginate },function(response){

        obj.setState({ projects1 : response.projects, page1 : response.page, max1: response.max });

      },"/api/v1/projects/relevant","get");
  }

  searchRelevant = (e) => {
     e.preventDefault();

      let obj = this;
      
      var filter = { status:"OPEN" ,s : this.searchform1.querySelector('.s1').value };

      ajax({ filter } ,function(response){

        obj.setState({ projects1 : response.projects, page1 : response.page, max1: response.max });

      },"/api/v1/projects/relevant","get");

  }

  createProjectItem = (project,i,r) => {

     var t = project;
     var slug = '/projects/'+t.slug; 

      var status = <span className="badge badge-md badge-pill badge-success  text-uppercase">OPEN</span>;       

      if(t.status === 'CLOSED')
          status = <span className="badge badge-md badge-pill badge-warning text-uppercase">CLOSED</span>; 

      var skills = [];


      

      if(r === true && this.props.user) {
       var userskills = this.props.user.skills.toLowerCase().split(",");
        var cl;
        var temp = t.skills.toLowerCase().split(',');
          Object.keys(temp).map(function(k){
            cl = "badge badge-lg badge-pill badge-secondary text-uppercase";

            for(var i=0;i<userskills.length;i++) {
                 
                if(userskills[i].trim() === temp[k].trim())
                  cl = "badge badge-lg badge-pill badge-primary text-uppercase";
            }

            skills.push(<span key={k} style={{marginRight:"5px"}} className={cl}>{temp[k].trim()}</span>);
          })

      } else {

          var temp = t.skills.split(',');
          Object.keys(temp).map(function(k){
            skills.push(<span key={k} style={{marginRight:"5px"}} className="badge badge-lg badge-pill badge-secondary text-uppercase">{temp[k].trim()}</span>);
          })

      }

  

      return (
        <li key={"pr"+i} className="clearfix">
                                        
            <div className="icon-li">
                <img src="/css/i/idea.png" alt="" />
            </div>


             <div className="desc-li">
                <h3><a href={slug}>{t.name}</a> {status}</h3>
                <div className="skills">
                  {skills}
                </div>
                <div className="text">{t.description}</div>
            </div>

            <div className="bids-li">{t.bids.length}</div>
            
            <div className="started-li"><span className="date"><Moment fromNow>{t.createdAt}</Moment></span></div>            
            
            <div className="range-li">${t.min_budget} - ${t.max_budget}</div>                

        </li>
        );

  }



	render() {

    let items = [],items1 = [],t,cl;
    var pagination = [],pagination1 = [];


    for(var i=1;i<this.state.max;i++) {
      
      cl = ' page-item ';

      if(this.state.page == i)
        cl += ' active ';  
      pagination.push(<li key={'p'+i} className={cl}><a onClick={this.paginateAll} className="page-link" data-paginate={i} href={i}>{i}</a></li>);
    }
    for(var i=1;i<this.state.max1;i++) {
      
      cl = ' page-item ';

      if(this.state.page1 == i)
        cl += ' active ';  
      pagination1.push(<li key={'p'+i} className={cl}><a onClick={this.paginateRelevant} className="page-link" data-paginate={i} href={i}>{i}</a></li>);
    }


    for(var i=0;i<this.state.projects.length;i++) {
      
      items[i] = (this.createProjectItem(this.state.projects[i],i,false));

    }


    for(var i=0;i<this.state.projects1.length;i++) {
      
      items1[i] = (this.createProjectItem(this.state.projects1[i],i,true));

    }

    var revelant = '';

    if(this.props.guest === false) {
      revelant = ( <div className="container">
                          <div className="row">
                              <div className="col-lg-12">
                                <h3>Relevant Projects</h3>
                              </div>

                              <div className="col-12 col-lg-12">
                              
                               <div className="fr-widget">
                                    <div className="fr-widget-body">
                                        
                                        <form ref={(f) => {this.searchform1 = f;} } onSubmit={this.searchRelevant} action="">
                                              <div className="input-group">
                                                  <input type="text" className="form-control s1" placeholder="Search by name or skills" aria-label="Search by name or skills" aria-describedby="basic-addon2" />
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
                                              

                                              {items1}


                                          </ul>

                                    </div>

                               </div>


                               <div className="project-widget">
                                   <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                     
                                       {pagination1}
                                     
                                    </ul>
                                  </nav>
                               </div>




                               </div>


                           </div>

                          </div>);
    }

		return (
                
               <div className="home-page">


                    <div className="container">
                        <div className="row home-row-1 padding-100">
                             
                             <div className="col-12 col-lg-8">
                                 
                                 <div className="text-widget wow fadeInRight">
                                     
                                    <h2 className='highlight'><span className="font-weight-600">billions</span> of small businesses use Freelancer to convert their ideas into dreams. </h2>
                                     
                
                                 </div>


                             </div>   

                             <div className="col-12 col-lg-4">
                                 
                                 <div className="home-appointment-widget">
                                     
                                      <div className="title">
                                          <h3>Recent Onboard Projects</h3>
                                          <h4>high ratings</h4>
                                      </div>

                                      <div className="appointment-body">
                                          
                                          <ul>
                                              <li className='clearfix'>
                                                  <div className="icon">
                                                      <img src="css/i/idea.png" alt="" />
                                                  </div>
                                                  <div className="text">
                                                      <h5>CMPE 273</h5>
                                                      <p>Lorem ipsum dolor loddu uduud hdydyd sit amet, consectetur adipiscing elit.</p>
                                                  </div>
                                              </li>

                                              <li className='clearfix'>
                                                  <div className="icon">
                                                      <img src="css/i/idea.png" alt="" />
                                                  </div>
                                                  <div className="text">
                                                      <h5>casrl deployed</h5>
                                                  </div>
                                              </li>
                                          </ul>

                                      </div>

                                 </div>


                             </div> 


                        </div>

                          
                    </div>   
                     <div className=" home-row-1 home-projects white-bg padding-100"> 
                              <div className="container">
                          <div className="row">
                              <div className="col-lg-12">
                                <h3>Latest Projects</h3>
                              </div>

                              <div className="col-12 col-lg-12">
                              
                               <div className="fr-widget">
                                    <div className="fr-widget-body">
                                        
                                        <form ref={(f) => {this.searchform = f;} } onSubmit={this.searchAll} action="">
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
                                                  <li className='desc-li'>briefing</li>             
                                                  <li className='bids-li'>Numbder of Bids</li>             
                                                  <li className='started-li'>workimg for</li>             
                                                  <li className='range-li'>Price input</li>             
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
                        <br/><br/>
                             {revelant}
                         </div>


               </div>    

		);

	}

}

export default rBridge(HomePage);

