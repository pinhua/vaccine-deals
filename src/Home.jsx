import { connectStorageEmulator } from '@firebase/storage';
import React , {Component, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
 class Home extends Component {

   constructor(props) {
      super(props)
      this.submitForm = this.submitForm.bind(this);
      this.state={location: '', shop: 'restaurant', price: '', selectedShopOptions: [], selectedLocationOptions: []};
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleShopChange = this.handleShopChange.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

   }
   handleShopChange(selectedShopOptions) {
    this.setState({ selectedShopOptions });
  }

  handleLocationChange(selectedLocationOptions) {
    this.setState({ selectedLocationOptions });
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
       locationOptions: this.state.selectedLocationOptions,
       shopOptions: this.state.selectedShopOptions,
       price: this.state.price
      }
    })
    
  }

  render() {
    const {selectedOptions} = this.state;
    const shopOptions = [
      {value: 'restaurant', label: 'Restaurant'},
      {value: 'foodcourt', label: 'Food Court'},
      {value: 'fastfood', label: 'Fast Food'},
      {value: 'halal', label: 'Halal'}
    ]
    const locationOptions = [
      {value: 'location1', label: 'Location 1'},
      {value: 'location2', label: 'Location 2'},
      {value: 'location3', label: 'Location 3'},
      {value: 'location4', label: 'Location 4'}
    ]
    return(
    
    <div>
      <form onSubmit={this.submitForm}>
        <label>Location:</label>    
        <Select isMulti isClearable isSearchable onChange={this.handleLocationChange} options={locationOptions}  />
       

        <label>Shop type:</label>
        <Select isMulti isClearable isSearchable onChange={this.handleShopChange}  options={shopOptions} />
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
        <label htmlFor='price'>{this.state.price}</label>
        <input type="submit" />
      </form>
    </div>
  );
  }
}

export default withRouter(Home);