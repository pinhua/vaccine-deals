import { connectStorageEmulator } from '@firebase/storage';
import React , {Component, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider';
export function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
        {value}
      </div>
    </div>
  )
}
function Tick({ tick, count }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 52,
          marginLeft: -0.5,
          width: 1,
          height: 8,
          backgroundColor: 'silver',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 60,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {tick.value}
      </div>
    </div>
  )
}
function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}
 class Home extends Component {

   constructor(props) {
      super(props)
      this.submitForm = this.submitForm.bind(this);
      this.state={location: '', shop: 'restaurant', minPrice: 0, maxPrice: 5, selectedShopOptions: [], selectedLocationOptions: []};
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleShopChange = this.handleShopChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      

   }
   handleShopChange(selectedShopOptions) {
    this.setState({ selectedShopOptions });
  }

  handleLocationChange(selectedLocationOptions) {
    this.setState({ selectedLocationOptions });
  }
  
  handlePriceChange(values){
    this.setState({
      minPrice: values[0],
      maxPrice: values[1]
    })
    
  }
  submitForm(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/results',
      state: {
       locationOptions: this.state.selectedLocationOptions,
       shopOptions: this.state.selectedShopOptions,
       minPrice: this.state.minPrice,
       maxPrice: this.state.maxPrice
      }
    })
    
  }

  render() {
    const sliderStyle = {  // Give the slider some width
      position: 'relative',
      width: '100%',
      height: 80,
      border: '1px solid steelblue',
    }
    
    const railStyle = {
      position: 'absolute',
      width: '100%',
      height: 10,
      marginTop: 35,
      borderRadius: 5,
      backgroundColor: '#8B9CB6',
    }
    
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
        <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    mode={2}
    values={[10,30]}
    onChange={this.handlePriceChange}
    name = 'price'
  ><Rail>
  {({ getRailProps }) => (
    <div style={railStyle} {...getRailProps()} />
  )}
</Rail>
    
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              getHandleProps={getHandleProps}
            />
          ))}
        </div>
      )}
    </Handles>
    <Tracks right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Tracks>
    <Ticks count={15 /* generate approximately 15 ticks within the domain */}>
      {({ ticks }) => (
        <div className="slider-ticks">
          {ticks.map(tick => (
            <Tick key={tick.id} tick={tick} count={ticks.length} />
          ))}
        </div>
      )}
    </Ticks>
  </Slider>
        <input type="submit" />
      </form>
    </div>
  );
  }
}

export default withRouter(Home);