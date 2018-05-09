import React from "react";
import Particles from "react-particles-js";

export default class Landing extends React.Component {
  handleLogin() {}

  render() {
    const params = {
      particles: {
        number: {
          value: 20
        },

        line_linked: {
          distance: 100,
          color: "#EB7F00"
        }
      }
    };
    return (
      <div className="landing-page">
        <Particles params={params} className="particles">
        </Particles>
          <div>
            <h1>On The Clock</h1>

            <a href={process.env.REACT_APP_LOGIN}>
              <button>Login</button>
            </a>
          </div>
      </div>
    );
  }
}
