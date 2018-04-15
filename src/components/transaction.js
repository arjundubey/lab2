import React from "react";
import {ajax,formHandler,rBridge} from '../helpers/helpers';
import DashboardTabbedNav from "../components/dashboardTab.js";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Payment from 'payment';

class Transaction extends React.Component {
  
  state = {  user:''  , transactions : [] ,

    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null
    }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  }

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    }
    else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    }
    else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  componentWillMount() {

    var obj = this;

       ajax({ },(r) => { 

          obj.setState({ transactions : r.transcations });

            Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));  

    },"/api/v1/transaction","get")

   

  }  



  addMoney  = (event) => {

      event.preventDefault();

    let temp = this.addForm;
     var obj =this;
    var data = formHandler(temp);
    data['type'] = 'add';


    ajax({ data : data  },(r) => { 

          obj.props.manageSession(true,r);

          alert('Money Added !');
          temp.reset();
        

    },"/api/v1/transaction")

  }


  withdrawMoney = (event) => {

      event.preventDefault();
    
    if(this.props.user.balance <= 0) {
       alert('Insufficient balance');
    }

    let temp = this.withdrawForm;
   var obj =this;
    var data = formHandler(temp);
    data['type'] = 'withdraw';

    ajax({ data : data  },(r) => { 

         obj.props.manageSession(true,r);

          alert('Money withdrawn to bank !');
          temp.reset();
       

    },"/api/v1/transaction/withdraw")

  }

 
	render() {

   var PieChart = require("react-chartjs").Pie;
    var transactions = this.state.transactions;
    
    var deposits = 0 , withdrawal = 0;

    for(var i=0;i<transactions.length;i++) {

       if(transactions[i]['type'] == 'add')
          deposits += transactions[i].amount;

        if(transactions[i]['type'] == 'withdraw')
          withdrawal += transactions[i].amount;
    }

    var chartData = [
    {
    value: deposits,
    color:"#F7464A",
    highlight: "#FF5A5E",
    label: "Deposits"
  },
  {
    value: withdrawal,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Withdrawals"
  }
  ];

  const { name, number, expiry, cvc, focused, issuer } = this.state;

    var chartOptions = {};
		return (

			
        <div className="project-create-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                    

                          <div className="row home-row-1 padding-75">
                 
                          <div className="col-12 col-lg-12 mb-3">
                                <h2>
                                    <span className="badge badge-lg badge-pill badge-tertiary text-uppercase">Total Balance <strong>${this.props.user.balance}</strong></span>
                                </h2>
                          </div>
                           <div className="col-12 col-lg-6">
                               
                             <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Add Money</h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                                       <div className="single-project-description">
                                          <form ref={ (f) => { this.addForm = f;} } onSubmit={this.addMoney} action="">

                                         

                                          <Cards
                                                number={number}
                                                name={name}
                                                expiry={expiry}
                                                cvc={cvc}
                                                focused={focused}
                                                callback={this.handleCallback}
                                              />

                                               <div className="row mt-3 mb-3">
                                                      <div className="col">
                                                      <label >Enter Amount to add</label>
                                                      <input type="text" required className="form-control" name="amount" />  
                                                      </div>
                                          </div>


                                                                                 <div className="form-group">
                                                  <input
                                                    type="tel"
                                                    name="number"
                                                    className="form-control"
                                                    placeholder="Card Number"
                                                    pattern="[\d| ]{16,22}"
                                                    required
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                  />
                                                  <small>E.g.: 49..., 51..., 36..., 37...</small>
                                                </div>
                                                <div className="form-group">
                                                  <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    required
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                  />
                                                </div>
                                                <div className="row">
                                                  <div className="col-6">
                                                    <input
                                                      type="tel"
                                                      name="expiry"
                                                      className="form-control"
                                                      placeholder="Valid Thru"
                                                      onChange={this.handleInputChange}
                                                      onFocus={this.handleInputFocus}
                                                    />
                                                  </div>
                                                  <div className="col-6">
                                                    <input
                                                      type="tel"
                                                      name="cvc"
                                                      className="form-control"
                                                      placeholder="CVC"
                                                      onChange={this.handleInputChange}
                                                      onFocus={this.handleInputFocus}
                                                    />
                                                  </div>
                                                </div>
                                                <input type="hidden" name="issuer" value={issuer} />

                                                                                   

                                                 <div className="row mt-3">    
                                                <div className="col">    
                                                <button className='btn'>Add Money <i className="fas fa-angle-right"></i></button>
                                                </div>
                                                </div>
                                          </form>
                                       </div>

                                    </div>

                               </div>

                           </div> 

                            <div className="col-12 col-lg-6">
                               
                              <div className="fr-widget">
                                   
                                    <div className="title">
                                        <h3>Withdraw Money</h3>
                                    </div>

                                    <div className="fr-widget-body">
                                        
                                       <div className="single-project-description">
                                          <form ref={ (f) => { this.withdrawForm = f;} } onSubmit={this.withdrawMoney} action="">
                                               <div className="row mb-3">
                                                      <div className="col">
                                                      <label >Enter Amount to Withdraw</label>
                                                      <input type="text" required className="form-control" name="amount" />  
                                                      </div>
                                                </div>
                                               <div className="row mb-3">
                                                      <div className="col">
                                                      <label >Enter Account Number</label>
                                                      <input type="text" required className="form-control" name="account_no" />  
                                                      </div>
                                                </div>
                                                <div className="row mb-3">
                                                      <div className="col">
                                                      <label >Bank Name</label>
                                                      <input type="text" required className="form-control" name="bank" />  
                                                      </div>

                                                      <div className="col">
                                                      <label >Branch</label>
                                                      <input type="text" required className="form-control" name="branch" />  
                                                      </div>

                                                </div>

                                                 <div className="row">    
                                                <div className="col">    
                                                <button className='btn'>Withdraw Money <i className="fas fa-angle-right"></i></button>
                                                </div>
                                                </div>
                                          </form>
                                       </div>

                                    </div>

                               </div>


                           </div> 


                           <div className="col-12 col-lg-12 mt-4">
                               
                               <div className="fr-widget">
                                <div className="title"><h3>Chart</h3></div>
                                 <div className="fr-widget-body">
                                <PieChart data={chartData} options={chartOptions} width="600" height="250"/>
                                </div>
                                </div>
                               <div className="fr-widget mt-3">
                                 <div className="title"><h3>Transaction histroy</h3></div>
                                 <div className="fr-widget-body no-padding">
                                   <table className="table table-hover align-items-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Transaction ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        
                                   
                                        
                                        {Object.keys(transactions).map(key => 
                                           <tr className="bg-white" key={key} scope="row">
                                        <th scope="col">{transactions[key]._id}</th>
                                        <th scope="col">04/11/2018</th>
                                        <th scope="col">{transactions[key].amount}</th>
                                        <th scope="col">{transactions[key].type}</th>
                                        <th scope="col">{transactions[key].notes}</th>
                                        </tr>
                                        )}

                                    
                                </tbody>
                            </table>
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

export default rBridge(Transaction);

