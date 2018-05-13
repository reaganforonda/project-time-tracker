import React from "react";
import Particles from "react-particles-js";
import Clock from './Clock';


export default class Landing extends React.Component {
  

  render() {
    const params = {
      particles: {
        number: {
          value: 100
        },

        line_linked: {
          distance: 325,
          color: "#6B6E70",
          width: 1,
          opacity: .3
        },
        color: { value: "#86C232" },

        size: {
          value: 3
        },

        shape: {
          "stroke.width": 10,
          "stroke.color": "#61892F"
        }
      }
    };
    return (
      <div className="landing-page">
        <div>
          <Particles params={params} className="particles" />
        </div>
        
        <div className="landing-content">
          <h1 className="landing-h1">ON THE CLOCK</h1>
          <div className='clock-div'>
          <Clock/>
            </div>
          <p>A time tracking and billing application</p>

          <a href={process.env.REACT_APP_LOGIN}>
            <button className="btn">
              Login
            </button>
          </a>
        </div>
      </div>
    );
  }
}
