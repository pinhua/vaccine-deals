import React , {Component, useState} from 'react';
import {withRouter} from 'react-router-dom';

 class Home extends Component {
   constructor(props) {
      super(props)
      this.submitForm = this.submitForm.bind(this);
      this.state={location: '', halal: true , shop: 'restaurant', price: ''};
      this.handleInputChange = this.handleInputChange.bind(this);
   }
   handleInputChange(event){
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;
     this.setState({
      [name]: value
    });
    console.log(this.state)
   }
  submitForm(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/results',
      state: {
       location: this.state.location,
       halal: this.state.halal,
       shop: this.state.shop,
       price: this.state.price
      }
    })
   
  }
  render() {
    return(
    <div>
      <form onSubmit={this.submitForm}>
        <label>Location:</label>    
        <input type="text" id="location" name="location" value={this.state.location} onChange={this.handleInputChange}></input>
        <label>
          Halal
        <input
            name="halal"
            type="checkbox"
            checked={this.state.halal}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <select name="shop" id="shop" onChange={this.handleInputChange} value={this.state.shop}>
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
          min="5"
          max="1000"
          step="5"
          value={this.state.price} 
          onChange={this.handleInputChange}
        ></input>
        <input type="submit" />
      </form>
    </div>
  );
  }
}

export default withRouter(Home);