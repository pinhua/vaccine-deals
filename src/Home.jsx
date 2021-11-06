import React , {Component} from 'react';
import {withRouter} from 'react-router-dom';

 class Home extends Component {
   constructor(props) {
      super(props)
      this.submitForm = this.submitForm.bind(this);
   }
  submitForm(e) {
    e.preventDefault();
    this.props.history.push('/results')
   
  }
  render() {
    return(
    <div>
      <form onSubmit={this.submitForm}>
        <label>Location:</label>    
        <input type="text" id="location" name="location"></input>
        <input type="radio" id="halal" name="halalStatus" value="Halal"></input>
        <label htmlFor="halal">Halal</label>
        <input
          type="radio"
          id="non-halal"
          name="halalStatus"
          value="Non-Halal"
        ></input>
        <label htmlFor="non-halal">Non-Halal</label>
        <br />
        <select name="shop" id="shop">
          <option value="fastfood">Fast Food</option>
          <option value="restaurant">Restaurant</option>
          <option value="foodcourt">Food Court</option>
        </select>
        <br />
        <label htmlFor="price">Price Range</label>
        <input
          type="range"
          id="price"
          name="price"
          min="0"
          max="1000"
          step="10"
          value="10"
        ></input>
        <input type="submit" />
      </form>
    </div>
  );
  }
}

export default withRouter(Home);