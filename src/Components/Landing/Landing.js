import React from "react";
import Particles from "react-particles-js";

export default class Landing extends React.Component {
  handleLogin() {}

  render() {
    const params = {
      particles: {
        number: {
          value: 30
        },

        line_linked: {
          distance: 125,
          color: "#61892F",
          width: 3,
          opacity: .8
        },
        color: { value: "#6b6e70" },

        size: {
          value: 8
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
