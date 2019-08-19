import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {actions as weatherActions} from '../weather/';

const First_CODES = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9
};

const Second_CODES = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9
};

class CitySelector extends React.Component {
  constructor() {
    super(...arguments);
    this.onChangeFirstNumber = this.onChangeFirstNumber.bind(this);
    this.onChangeSecondNumber = this.onChangeSecondNumber.bind(this);
    this.onChangePeriods = this.onChangePeriods.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.state = {
      first: null,
      second: null,
      periods: null,
    }
  }

  onChangeFirstNumber(ev) {
    const res = ev.target.value;
    this.setState({
      first:Number(res)
    })
  }

  onChangeSecondNumber(ev) {
    const res = ev.target.value;
    this.setState({
      second:Number(res)
    })
  }

  onChangePeriods(ev) {
    this.setState({
      periods: Number(ev.target.value)
    })
  }

  handlePost(ev) {
    const {first, second, periods} = this.state;
    const data = [];
    data.push(first, second);
    this.props.onSelectCity(data, periods);
  }

  componentDidMount() {
    //const First = Object.keys(First_CODES)[0];
    //const Second = Object.keys(First_CODES)[0];
    //this.props.onSelectCity();
  }

  render() {
    return (
     <div> 
      <select onChange={this.onChangeFirstNumber}>
        {
          Object.keys(First_CODES).map(
            cityName => <option key={cityName} value={First_CODES[cityName]}>{cityName}</option>
          )
        }
      </select>
          <select onChange={this.onChangeSecondNumber}>
          {
            Object.keys(Second_CODES).map(
              cityName => <option key={cityName} value={Second_CODES[cityName]}>{cityName}</option>
            )
          }
        </select>
        <input placeholder="期数" onChange={this.onChangePeriods} value = {this.state.periods}/>
        <button onClick={this.handlePost}>提交</button>
      </div>
    );
  }
}

CitySelector.propTypes = {
  onSelectCity: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCity: (data, periods) => {
      dispatch(weatherActions.fetchWeather(data, periods));
    }
  }
};  

export default connect(null, mapDispatchToProps)(CitySelector);

