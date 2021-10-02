import React, {Component} from "react";
class results extends Component {
  render (){
      return (
    <ul>
      <div class="row">
        <div class="column">
          <img src="https://placekitten.com/200/300" />
        </div>
        <div class="details">
          <div class="name">Restauant 1</div>
          <div class="button">
            <a href="details.html">View</a>
          </div>
          <div id="button"></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <img src="https://placekitten.com/200/300" />
        </div>
        <div class="details">
          <div class="name">Restauant 2</div>
          <div class="button">
            <a href="details.html">View</a>
          </div>
          <div id="button"></div>
        </div>
      </div>
    </ul>
      );
  }
}
export default results;