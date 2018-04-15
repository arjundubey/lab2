import React from "react";
import DashboardTabbedNav from "../../components/dashboardTab.js";
import {ajaxMultiparts} from '../../helpers/helpers';

import Dropzone from 'react-dropzone';

class ProjectNew extends React.Component {
   
   state = { file:'' }

   onDrop = (files) => {

    this.filename.innerHTML = files[0].name;

   }  

   componentDidMount() {

    if(this.props.guest){

        this.props.history.push('/notallowed');    
        return;
    }
    
   }

   submitProject = (event) => {

    event.preventDefault();
    ajaxMultiparts('/api/v1/project',this.form,function(){});

  }

	render() {

		return (
                
               <div className="project-create-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                 

                           <div className="col-12 col-lg-8">
                               
                               <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Create new project</h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                                       <form ref={(f) => {this.form = f;} } onSubmit={this.submitProject} action="" className="fr-row-20">
                                            
                                       <input type="hidden" name="type" value="create-project"/>
                                         <div className="row">
                                            <div className="col">
                                            <label >Project Name</label>
                                            <input type="text" required className="form-control" name="name" />  
                                            </div>
                                          </div>


                                          <div className="row">
                                               <div className="col">
                                            <label >Project Description</label>
                                            <textarea name="description" required id="" className="projectdesc form-control" cols="30" rows="10"></textarea>
                                            </div>
                                            </div>


                                             <div className="row">
                                            <div className="col">
                                            <label >Upload File</label>
                                             <div className="dropzon-filewrap">
                                             <div className="dropzone">
                                             <svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g fill="#111111"><line fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="4.5" y1="11.5" x2="11.5" y2="11.5" data-color="color-2"></line> <line fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="4.5" y1="8.5" x2="11.5" y2="8.5" data-color="color-2"></line> <line fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="4.5" y1="5.5" x2="6.5" y2="5.5" data-color="color-2"></line> <polygon fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="9.5,0.5 1.5,0.5 1.5,15.5 14.5,15.5 14.5,5.5 "></polygon> <polyline fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="9.5,0.5 9.5,5.5 14.5,5.5 "></polyline></g></svg>
          <Dropzone name="file" accept=".pdf,.doc,.txt,.docx"  style={{}}  onDrop={this.onDrop.bind(this)}>
            <p><strong  ref={ (el) => {this.filename = el;} } className="file-name"></strong> Following formats are support - PDF,DOC,DOCX and TXT.</p>
          </Dropzone>
        </div></div>                            
                                            </div>
                                          </div>

                                          <div className="row">
                                            <div className="col">
                                            <label >Required skils</label>
                                            <input type="text" required className="form-control" name="skills" />  
                                            </div>
                                          </div>

                                          <br /><div className="divider"></div>

                                          <h4>Budget range</h4>
                                          <div className="row">
                                            
                                            <div className="col">
                                            <label >Min(in USD)</label>
                                            <input type="number" required className="form-control" name="min_budget" />  
                                            </div>
                                            <div className="col">
                                            <label >Max(in USD)</label>
                                            <input type="number" required className="form-control" name="max_budget" />  
                                            </div>
                                          </div>

                                          <br /><div className="divider"></div>

                                            
                                            <div className="row">    
                                            <div className="col">    
                                            <button type="submit" className='btn'>Post <i className="fas fa-angle-right"></i></button>
                                            </div>
                                            </div>
                                         </form>

                                    </div>

                               </div>


                           </div> 

                            <div className="col-12 col-lg-4">
                               
                               <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Guideline to follow</h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt nisl id consequat tincidunt. Vivamus ut dui purus. Praesent nisl dui, ultrices quis vehicula eget, ornare eu eros. </p>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt nisl id consequat tincidunt. Vivamus ut dui purus. Praesent nisl dui, ultrices quis vehicula eget, ornare eu eros. </p>

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

export default ProjectNew;

