import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../index.css';


const Preview = props => {
  const user = props.user;

  const handleClick = ev => {
    
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <div className="aaa" style={{backgroundColor: "#DDDDDD"}}>
          <img src={user.imagepath} alt={user.name} className="circular--square" height="100" width="100" /><br/>
          <a>{user.userid}</a><br/>
          <a>{user.name}</a><br/>
          <a>{user.blood_suger}</a><br/>
          <a>{user.blood_pressure}</a><br/>
          <a>{user.temperature}</a><br/>
          <a>{user.activate}</a><br/>
          <a>{user.sleep}</a>
        </div>
        <br/>
      </div>
    </div>
  );
}

export default Preview
