import React from "react";
import Moment from 'react-moment';

class Bid extends React.Component {

	setBid = (e) => {

		e.preventDefault();


		this.props.finalizeBid(this.props.data.user.id,this.props.data.id);

	}

	render() {

    var bid = this.props.data;
    var button = (<td><a onClick={this.setBid} className="btn btn-secondary" href={bid.user.id}>Hire</a></td>);

		console.log(bid.user);
    if(this.props.status === 'CLOSED' || this.props.guest === true | this.props.canHire === false )
    	button = null;

    var avatar;
      if(bid.user.avatar === "" || typeof bid.user.avatar === "undefined"){
        avatar = <span className="avatar bg-purple avatar-lg mr-3">{bid.user.first_name[0]}{bid.user.last_name[0]}</span>
      } else {
        avatar = <img alt="avatar" src={"http://localhost:3000/uploads/"+bid.user.avatar} className="avatar avatar-lg mr-3" />
      }
     
		return (
                
               <tr className="bg-white">
		            <td>
		                <div className="media align-items-center">
		                    {avatar}
		                    <div className="media-body">
		                        <h6 className="h5 font-weight-normal mb-0">{bid.user.first_name}</h6>
		                        <span className="font-weight-normal text-muted">{bid.user.skills}</span>
		                    </div>
		                </div> 
		            </td>
		            <td><span className="price">${bid.price}</span></td>
		            <td><Moment format="M/D/Y">{bid.createdAt}</Moment></td>
		            <td><span className="badge badge-md badge-pill badge-tertiary text-uppercase">{bid.time} Days</span></td>{button}</tr>


		);

	}

}

export default Bid;

