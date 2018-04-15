import React from "react";
import {ajax,formHandler,rBridge} from '../helpers/helpers';

class BidForm extends React.Component {
  
   submitProject = (event) => {

    event.preventDefault();

    let obj = this,temp = formHandler(this.form);
 
    var data = {

      "project_id" : this.props.projectId,
      "user_id" : this.props.user.id,
      "price" : temp.price,
      "time" : temp.time,
      "description" : ''
    }  

    
    ajax({  formData : data },(r) => { 
       
       obj.props.addBid(r);

    },'/api/v1/bid')


  }

	render() {

		return (
                
               <div className="bid-form">

                  <form ref={(f) => {this.form = f;} } action="" onSubmit={this.submitProject} className="fr-row-20">
                                            

                                         <div className="row">
                                            <div className="col">
                                            <label >Your Bid($)</label>
                                            <input  type="text" required className="form-control" name="price" />  
                                            </div>
                                          </div>


                                          <div className="row">
                                            <div className="col">
                                            <label >Completion Time(in days)</label>
                                           <input type="text" required className="form-control" name="time" />  
                                            </div>
                                            </div>

                                            
                                            <div className="row">    
                                            <div className="col">    
                                            <button type="submit" className='btn'>Bid <i className="fas fa-angle-right"></i></button>
                                            </div>
                                            </div>
                                         </form>
                          
           </div> 
  

		);

	}

}

export default rBridge(BidForm);

