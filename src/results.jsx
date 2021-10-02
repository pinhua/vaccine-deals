import React, {Component} from "react";
class Results extends Component {
  render (){
      return (
    <ul>
      <div className="row">
        <div className="column">
          <img src="https://placekitten.com/200/300" />
        </div>
        <div className="details">
          <div className="name">Restauant 1</div>
          <div className="button">
            <a href="details.html">View</a>
          </div>
          <div id="button"></div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <img src="https://placekitten.com/200/300" />
        </div>
        <div className="details">
          <div className="name">Restauant 2</div>
          <div className="button">
            <a href="details.html">View</a>
          </div>
          <div id="button"></div>
        </div>
      </div>
    </ul>
      );
  }
}
export default Results;