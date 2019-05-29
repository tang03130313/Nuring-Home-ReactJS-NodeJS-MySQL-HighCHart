import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../index.css';


const Preview = props => {
  const user = props.user;
  var blood = user.blood_suger == 3 ? require('../image/blood_red.png') : (user.blood_suger == 2 ? require('../image/blood_yellow.png') :(user.blood_suger == 1 ? require('../image/blood_green.png') : require('../image/blood.png')));
  var blood_pressure = user.blood_pressure == 3 ? require('../image/blood-pressure_red.png') : (user.blood_pressure == 2 ? require('../image/blood-pressure_yellow.png') :(user.blood_pressure == 1 ? require('../image/blood-pressure_green.png') : require('../image/blood-pressure.png')));
  var temperature = user.temperature == 3 ? require('../image/thermometer_red.png') : (user.temperature == 2 ? require('../image/thermometer_yellow.png') :(user.temperature == 1 ? require('../image/thermometer_green.png') : require('../image/thermometer.png')));
  var activate = user.activate == 3 ? require('../image/running_red.png') : (user.activate == 2 ? require('../image/running_red.png') :(user.activate == 1 ? require('../image/running_green.png') : require('../image/running.png')));
  var sleep = user.sleep == 3 ? require('../image/crescent-moon_red.png') : (user.sleep == 2 ? require('../image/crescent-moon_yellow.png') :(user.sleep == 1 ? require('../image/crescent-moon_green.png') : require('../image/crescent-moon.png')));

  return (
    
    <div>
        <Link to={`patient/${user.userid}`} className="link">
            <div className="top_blank"></div>
            <div className="photo">
              <img src={user.imagepath} alt={user.name} />
            </div>
            <div className="name">
              {user.name} 
            </div>
            <div class="condition">
              <img src={blood} alt="" /><img src={blood_pressure} /><img src={temperature} /><img src={activate} /><img src={sleep} />
            </div>
      </Link>  
    </div>
    
  );
}

export default Preview