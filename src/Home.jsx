import { connectStorageEmulator } from '@firebase/storage';
import React , {Component, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
 class Home extends Component {

   constructor(props) {
      super(props)
      this.submitForm = this.submitForm.bind(this);
      this.state={location: '', shop: 'restaurant', price: '', selectedOptions: []};
      this.handleInputChange = this.handleInputChange.bind(this);
   }
   handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
    console.log(selectedOptions);
    console.log(this.state);
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
       
       shopOptions: this.state.selectedOptions,
       price: this.state.price
      }
    })
    
  }

  render() {
    const {selectedOptions} = this.state;
    const options = [
      {value: 'restaurant', label: 'Restaurant'},
      {value: 'foodcourt', label: 'Food Court'},
      {value: 'fastfood', label: 'Fast Food'},
      {value: 'halal', label: 'Halal'}
    ]

    return(
    
    <div>
      <form onSubmit={this.submitForm}>
        <label>Location:</label>    
        <input list='locations' id="location" name="location" value={this.state.location} onChange={this.handleInputChange} />
          <datalist id='locations'>
            <option value='location 1'>location 1</option>
            <option value='location 2'>location 2</option>
            <option value='location 3'>location 3</option>
            <option value='location 4'>location 4</option>
          </datalist>
       

        
        <Select isMulti isClearable options={options} 
          onChange={this.handleChange} />
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