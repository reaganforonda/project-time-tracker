import React from "react";
import Particles from "react-particles-js";

export default class Landing extends React.Component {
  handleLogin() {}

  render() {
    const params = {
      particles: {
        number: {
          value: 40
        },

        line_linked: {
          distance: 100,
          color: "#EB7F00",
          width: 2,
          opacity: 0.4
        },
        color: { value: "#ACF0F2" },

        size: {
          value: 8
        },

        shape: {
          "stroke.width": 1,
          "stroke.color": "#1695A3"
        }
      }
    };
    return (
      <div className="landing-page">
        <Particles params={params} className="particles" />
        <div className="landing-content">
          <h1 className="landing-h1">ON THE CLOCK</h1>

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
