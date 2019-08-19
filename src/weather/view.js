import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as Status from './status.js';

const Weather = ({status, lot_data}) => {
  switch (status) {
    case Status.LOADING: {
      return <div>信息请求中...</div>;
    }
    case Status.SUCCESS: {
      return (
        <div>
           Result: {lot_data.join(', ')}
        </div>
      )
    }
    case Status.FAILURE: {
      return <div>信息请求失败</div> 
    }
    default: {
      throw new Error('unexpected info ');
    }
  }
}

Weather.propTypes = {
  status: PropTypes.string.isRequired,
};

const mapStateTopProps = (state) => {
  const weatherData = state.weather;

  return {
    status: weatherData.status,
    lot_data: weatherData.data
  };
}

export default connect(mapStateTopProps)(Weather);
