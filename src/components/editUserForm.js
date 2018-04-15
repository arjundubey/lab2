import React from "react";
import {ajax,ajaxMultiparts,rBridge} from '../helpers/helpers';
import DashboardTabbedNav from "../components/dashboardTab.js";
import Dropzone from 'react-dropzone';


class EditUserForm extends React.Component {
  
  state = {  user:'' }

  componentWillMount() {

      let obj = this;

      ajax({  },function(r){

          obj.setState({ user : r });

          

      },"/api/v1/user/",'get');

  }  

  onDrop(files) {
    
    var src = files[0].preview;

    this.image.src = src;

  }


	registerUser = (event) => {

    event.preventDefault();

    let obj = this;

    ajaxMultiparts('/user/'+this.props.user.id,this.form,function(){
      
      obj.msg.style.display = "block";

    },'put');


  }

	render() {

    var u = this.state.user;

    if(u === '')
      return (<div>Rendering...</div>);

		return (

			
        <div className="project-create-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                      <form ref={(f) => {this.form = f;} } onSubmit={this.registerUser} action="" className="fr-row-20">


                          <div className="row home-row-1 padding-75">
                 

                           <div className="col-12 col-lg-8">
                               
                               <div ref={ (el) => { this.msg = el } } style={{display:"none"}} className="alert alert-success alert-dismissible fade show" role="alert">
    <span className="alert-inner--icon"><i className="fas fa-check"></i></span>
    <span className="alert-inner--text"><strong>Profile</strong> has been updated!</span>
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

                               <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Update Profile</h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                <div className="row">
                                  <div className="col">
                                  <label >Enter Firstname</label>
                                  <input type="text" required defaultValue={u.first_name} className="form-control" name="first_name" />  
                                  </div>

                                  <div className="col">
                                  <label >Enter Lastname</label>
                                  <input type="text" required defaultValue={u.last_name} className="form-control" name="last_name" />  
                                  </div>

                                  </div>
                                  
                                  <div className="row">
                                  <div className="col">
                                  <label >Enter Email</label>
                                  <input type="email" required defaultValue={u.email} className="form-control" name="email" />  
                                  </div>
                                 
                                  <div className="col">
                                  <label >Enter Telephone</label>
                                  <input type="tel" required defaultValue={u.phone} className="form-control" name="phone" />  
                                  </div>
                                  </div>

                                  <div className="row">
                                  <div className="col">
                                  <label >Enter <strong>new password</strong></label>
                                  <input type="password" className="form-control" name="password" />  
                                  </div>
                                  </div>

                                   <div className="row">
                                  <div className="col">
                                  <label >Skills</label>
                                  <input type="text" defaultValue={u.skills} className="form-control" name="skills" />  
                                  </div>
                                  </div>

                                   <div className="row">
                                  <div className="col">
                                  <label >About Me</label>
                                   <textarea className="form-control" name="about" defaultValue={u.about} id="" cols="30" rows="10"></textarea>
                                  </div>
                                  </div>

                                  <div className="row">
                                  <div className="col select-dropdown">
                                  <label >I am looking to</label>
                                   <select name="utype" defaultValue={u.type} className="selectpicker" title="Looking for" data-live-search="false" >
                                      <option value="hire">hire</option>
                                      <option value="work">work</option>
                                    </select>
                                  
                                  </div>
                                  </div>
                                  
                                  <div className="row">    
                                  <div className="col">    
                                  <button type="submit" className='btn'>Update <i className="fas fa-angle-right"></i></button>
                                  </div>
                                  </div>
                              
                                    </div>

                               </div>


                           </div> 

                            <div className="col-12 col-lg-4">
                               
                               <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Upload Avatar</h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                                      <div className="row">
                                            <div className="col">
                                            
                                             <div className="dropzon-wrap">
                                                <div className="dropzone">
                                                  <Dropzone  onDrop={this.onDrop.bind(this)} name="file" style={{}} accept=".jpg,.png">
                                                   <span> <svg x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g fill="#ffffff"><path fill="#ffffff" d="M13,7.1c0,0,0-0.1,0-0.1c0-2.8-2.2-5-5-5C5.5,2,3.4,3.8,3.1,6.3C1.3,6.9,0,8.5,0,10.5C0,13,2,15,4.5,15 c1.7,0,5.9,0,7.5,0c2.2,0,4-1.8,4-4C16,9.1,14.7,7.6,13,7.1z M9,10v3H7v-3H4l4-4l4,4H9z"></path></g></svg></span>
                                                  </Dropzone>
                                                </div>
                                                   <input type="hidden" name="proxyavatar" defaultValue={u.avatar} />
                                                   <img ref={ (el) => {this.image = el;} } src={"/uploads/"+u.avatar} alt=""/>
                                             </div>
                                                   <h6> Following formats are support -JPG,PNG.</h6>
                                            </div>
                                          </div>


                                    </div>

                               </div>


                           </div> 


                      </div>
                       <input type="hidden" name="type" value="updateuser-details" />
                       <input type="hidden" name="id" value={u.id} />
                       </form>

                      </div>

                </div>
           </div> 

		);

	}

}

export default rBridge(EditUserForm);

