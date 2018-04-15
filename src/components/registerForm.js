import React from "react";
import {ajax,formHandler} from '../helpers/helpers';



class RegisterForm extends React.Component {
  
  

	registerUser = (event) => {

    event.preventDefault();

    let temp = this.form;

    ajax({ data : formHandler(temp) },(r) => { 

        console.log(r);

        if(typeof r.id !== "undefined") {

          this.msg.style.display = "block";
          temp.reset();
        }

    },"/user")


  }

	render() {

		return (

			//this section 
      <section className="py-xl bg-cover bg-size--cover" style={{ backgroundImage:"url('')" }} >
        <span className="mask  alpha-6"></span>
        <div className="container d-flex align-items-center no-padding">
          <div className="col">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card  ">
                  <div className="card-body">
                    <button type="button" className="btn btn-secondary  btn-zoom--hover mb-5">
                      <span className="btn-inner--icon"><i className="fas fa-arrow-left"></i></span>
                    </button>
                    <span className="clearfix"></span>
                  
                    <h4 className="heading h3  pt-3 pb-5">Register now,<br/>
                      login to your account.</h4>

                    <div ref={(el) => {this.msg = el;} } style={{display:"none"}} className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-inner--icon"><i className="fas fa-check"></i></span>
                        <span className="alert-inner--text">You have registered succsefully <a href="/login" className="white-text">Login from here</a> !</span>
                   
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>  
                   
                    <form ref={(f) => {this.form = f;} } action="" className="fr-row-20">
                                  
                                  <div className="row">
                                  <div className="col">
                                  <label >Enter Firstname</label>
                                  <input type="text" className="form-control" name="first_name" />  
                                  </div>

                                  <div className="col">
                                  <label >Enter Lastname</label>
                                  <input type="text" className="form-control" name="last_name" />  
                                  </div>

                                  </div>
                                  
                                  <div className="row">
                                  <div className="col">
                                  <label >Enter Email</label>
                                  <input type="email" className="form-control" name="email" />  
                                  </div>
                                  </div>

                                  <div className="row">
                                  <div className="col">
                                  <label >Enter password</label>
                                  <input type="password" className="form-control" name="password" />  
                                  </div>
                                  </div>

                                  <div className="row">
                                  <div className="col select-dropdown">
                                  <label >I am looking to</label>
                                   <select name="type" className="selectpicker" title="Looking for" data-live-search="false" >
                                      <option defaultValue="selected" value="hire">hire</option>
                                      <option value="work">work</option>
                                    </select>
                                  
                                  </div>
                                  </div>
                                  
                                  <div className="row">    
                                  <div className="col">    
                                  <button onClick={this.registerUser} className='btn'>Register <i className="fas fa-angle-right"></i></button>
                                  </div>
                                  </div>
                               </form>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     </section>

		);

	}

}

export default RegisterForm;

