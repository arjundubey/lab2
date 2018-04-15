import React from "react";
import DashboardTabbedNav from "../components/dashboardTab.js";
import BidForm from "../components/bidform.js";
import Bid from "../components/bids.js";
import {ajax,rBridge,ajaxMultiparts} from '../helpers/helpers';

import Dropzone from 'react-dropzone';

class SingleProject extends React.Component {
  
  state = { data:{} , bids : [] } 
  
  componentDidMount() {


      let obj = this;
      ajax({},function(response){

        obj.setState({ data : response.data , bids : response.bids });

      },"/api/v1/project/"+this.props.match.params.slug,'get');

  }

  onDrop = (files) => {

    this.filename.innerHTML = files[0].name;

   }  

  sortBids = (e) => {

      let obj = this;
      ajax({ filter:{ project_id : this.state.data.id , 'sort' : e.target.value } },function(response){

        obj.setState({  bids : response.bids });

      },"/api/v1/bids/",'get');

  }
  submitProject = (e) => { 
    e.preventDefault();

    ajaxMultiparts('/api/v1/submitproject',this.submitform,function(){

        alert('Project has been submitted');

    },'put');

  }

  addBid = (bid) => {

    let bids = this.state.bids;

    bids.push(bid);

    this.setState(bids);

  }

  finalizePayment = () => {

       let obj = this;
      ajax({ userid : this.props.user.id , projectid : this.state.data.id },function(response){

        var tempdata = obj.state.data;

        if(response.ok === 1)
            tempdata.status = 'FINISHED';

        obj.setState({ data : tempdata });

        alert("Freelancer has been paid !!");

      },"/api/v1/project/finalize");

  }

  finalizeBid = (userid,bidid) => {

      let obj = this;
      ajax({ type:'final-bid' , userid : userid , bidid : bidid, projectid : this.state.data.id, name :  this.state.data.name },function(response){

        var tempdata = obj.state.data;

        if(response.ok === 1)
            tempdata.status = 'CLOSED';

        obj.setState({ data : tempdata });

      });

  }

  render() {

    let b=this.state.bids,s = this.state.data,o=this;

    let bids = [],bidusers = {};

    var avgbid = 0,hire;

    for(var i=0;i<b.length;i++) {

       hire = false;

        if( this.props.user.id === s.user_id )
          hire= true;


       bids[i]  = <Bid canHire={hire} guest={o.props.guest} data={b[i]} status={s.status} key={i} finalizeBid={this.finalizeBid}  />
       bidusers[b[i].user.id] = 1; 
      avgbid += b[i].price;
    }
    

   var form = (
    <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Bid on {s.name}</h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                                       <div className="single-project-description">
                                          <BidForm addBid={this.addBid} projectId={s.id} />
                                       </div>

                                    </div>

                               </div>);

    if( s.status === 'CLOSED' )
        form = (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
              <span className="alert-inner--icon"><i className="fas fa-info"></i></span>
              <span className="alert-inner--text"><strong>Bidding is Closed!</strong> A bid has been selected !</span>
           
          </div>
          );

    var buttonth = <th scope="col">&nbsp;</th>;
      

    /*
    if( this.props.user.id === s.user_id || o.props.guest === true ){
       
     buttonth = null; 
    form = "";  
    }

   if(this.props.user.id in bidusers )
      form = (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
              <span className="alert-inner--icon"><i className="fas fa-info"></i></span>
              <span className="alert-inner--text">You can only bid once !</span>
           
          </div>
          );*/

    var submitproject = '', finalizeproject = '';

    /**
     * show this form only if project has been closed and current user is the winner
     * @type {[type]}
     */
    if(s.status=='CLOSED' && (s.bid_winner = this.props.user.id) )
    submitproject = (<div className="card single-project-info mb-3">
                                    <div className="card-header py-4">
                                        <h4 className="heading h5 font-weight-500 mb-0">Submit Project</h4>
                                    </div>
                                    <div className="list-group" style={{padding:"25px"}}>
                                        <form ref={(f) => {this.submitform = f;} } onSubmit={this.submitProject} action="" className="fr-row-20">
                                            
                                           <input type="hidden" name="type" value="create-project"/>
                                             <div className="row">
                                                <div className="col">
                                                <label >Project Notes</label>
                                                <textarea type="text" className="form-control" name="notes" placeholder="How client will run... etc"> </textarea>
                                                </div>
                                              </div>

                                            <div className="row">
                                                <div className="col">
                                                <label >Upload File</label>
                                                 <div className="dropzon-filewrap">
                                                 <div className="dropzone">
                                                 <svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g fill="#111111"><line fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="4.5" y1="11.5" x2="11.5" y2="11.5" data-color="color-2"></line> <line fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="4.5" y1="8.5" x2="11.5" y2="8.5" data-color="color-2"></line> <line fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="4.5" y1="5.5" x2="6.5" y2="5.5" data-color="color-2"></line> <polygon fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="9.5,0.5 1.5,0.5 1.5,15.5 14.5,15.5 14.5,5.5 "></polygon> <polyline fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="9.5,0.5 9.5,5.5 14.5,5.5 "></polyline></g></svg>
              <Dropzone name="file"  style={{}}  onDrop={this.onDrop.bind(this)}>
                <p><strong  ref={ (el) => {this.filename = el;} } className="file-name"></strong> Upload Project here.</p>
              </Dropzone>
            </div></div>                            
                                                </div>
                                              </div>
                                                
                                                <div className="row">    
                                                <div className="col">    
                                                <input type="hidden" defaultValue={s.id} name="id" />
                                                <button type="submit" className='btn'>Submit <i className="fas fa-angle-right"></i></button>
                                                </div>
                                                </div>
                                             </form>
                                    </div>
                                </div>);      

        
         /**
     * show this form only if project has been closed and current user is the winner
     * @type {[type]}
     */
    if(s.status=='CLOSED' && (s.user_id = this.props.user.id) && s.project_file !="" )
    finalizeproject = (<div className="card single-project-info mb-3">
                                    <div className="card-header py-4">
                                        <h4 className="heading h5 font-weight-500 mb-0">Project Material</h4>
                                    </div>
                                    <div className="list-group">
                                        <ul className="list-group list-group-flush">
                                          <li className="list-group-item"><strong>File</strong> : <a download href={'http://localhost:300/uploads/'+s.project_file}>{s.project_file}</a></li>
                                          <li className="list-group-item"><strong>Notes</strong> : {s.notes}</li>
                                          <li className="list-group-item">
                                              <p>By clicking on Make Payment, freelancer will be paid and project will be CLOSED. This cannot be undone !</p>
                                              <button onClick={this.finalizePayment} type="button" className="btn btn-lg btn-outline-dark btn-icon">
                                                  <span className="btn-inner--text">Make Payment</span>
                                                  <span className="btn-inner--icon"><i className="fas fa-arrow-right"></i></span>
                                              </button>
                                          </li>
                                        </ul>
                                    </div>
                                </div>);   


   if(s.status=='FINISHED' && (s.user_id = this.props.user.id) && s.project_file !="" )
    finalizeproject = (<div className="card single-project-info mb-3">
                                    <div className="card-header py-4">
                                        <h4 className="heading h5 font-weight-500 mb-0">Project Material</h4>
                                    </div>
                                    <div className="list-group">
                                        <ul className="list-group list-group-flush">
                                          <li className="list-group-item"><strong>File</strong> : <a download href={'http://localhost:300/uploads/'+s.project_file}>{s.project_file}</a></li>
                                          <li className="list-group-item"><strong>Notes</strong> : {s.notes}</li>
                                        </ul>
                                    </div>
                                </div>);  


    return (
                
               <div className="project-create-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                            

                            <div className="col-12 col-lg-8">
                     
                               <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>{s.name} <span className="badge badge-md badge-pill badge-primary text-uppercase">{this.state.data.status}</span></h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                                       <div className="single-project-description">
                                          {s.description}
                                       </div>

                                    </div>

                               </div>

                                <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Current Bids on {s.name}</h3>
                                         <select onChange={this.sortBids} className="selectpicker" title="Sort" data-live-search="false">
                                            <option value="date">By Date</option>
                                            <option value="asc">Lowest Price</option>
                                            <option value="desc">Highest Price</option>
                                        </select>
                                    </div>

                                    <div className="fr-widget-body no-padding">
                                        
                                       <div className="single-project-description">
                                           <table>
                                               <thead>
                                                  <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Bid</th>
                                                    <th scope="col">User Bidded on</th>
                                                    <th scope="col">Estimated Time</th>
                                                    {buttonth}
                                                 </tr>
                                               </thead>
                                               <tbody>
                                                  {bids}
                                               </tbody>
                                            </table>
                                       </div>

                                    </div>

                               </div>

                                {form}
                                
                           
                           </div> 


                           <div className="col-12 col-lg-4">
                              
                              {finalizeproject}

                              {submitproject}


                              <div className="card single-project-info">
                                    <div className="card-header py-4">
                                        <h4 className="heading h5 font-weight-500 mb-0">Project Details</h4>
                                    </div>
                                    <div className="list-group">
                                        <ul className="list-group list-group-flush">
                                          <li className="list-group-item"><strong>File</strong> : <a download href={'http://localhost:300/uploads/'+s.file}>{s.file}</a></li>
                                          <li className="list-group-item"><strong>Skills</strong> : {s.skills}</li>
                                          <li className="list-group-item"><strong>Budget</strong> : ${s.min_budget} to ${s.max_budget}</li>
                                          <li className="list-group-item"><strong>Avg Bid</strong> : ${ (avgbid==0) ? 0 : Math.round(avgbid/b.length)}.</li>
                                        </ul>
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

export default rBridge(SingleProject);

