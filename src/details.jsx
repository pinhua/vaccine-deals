import React, {Component} from "react";
class deatls extends Component{


  render () {

    return(
    <div class="row">
      <div class="column">
        <img src="https://placekitten.com/200/300" />
      </div>
      <div class="details">
        <div class="name">
          Location:
          <br />
          Offer:
        </div>
        <div class="button">
          <button>View map</button>
        </div>
      </div>
    </div>
  );
    }
}
export default details