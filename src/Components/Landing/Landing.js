import React from "react";
import axios from "axios";
import AppBar from "material-ui/AppBar";

export default class Landing extends React.Component {
  handleLogin() {}

  render() {
    return (
      <div className="landing-page">
        <nav>
          <h1>Creative App Title</h1>
          <a href={process.env.REACT_APP_LOGIN}>
            <button>Login</button>
          </a>
        </nav>
        <header className="landing-header" />
        <section className="about-section-landing">
          <h2>About</h2>
          <p>
            Lorem ipsum dolor amet meh selfies DIY pour-over selvage iceland,
          </p>
        </section>
        <footer>
          <div>

          </div>
        </footer>
      </div>
    );
  }
}
