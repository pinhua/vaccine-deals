import React, {Component} from "react";
class Details extends Component{


  render () {

    return(
    <div className="row">
      <div className="column">
        <img src="https://placekitten.com/200/300" />
      </div>
      <div className="details">
        <div className="name">
          Location:
          <br />
          Offer:
        </div>
        <div className="button">
          <button>View map</button>
        </div>
      </div>
    </div>
  );
    }
}
export default Details