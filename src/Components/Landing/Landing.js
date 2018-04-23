import React from "react";
import axios from "axios";

export default class Landing extends React.Component {
  handleLogin() {}

  render() {
    return (
      <div className="landing-page">
        <nav>
          <h1>App Title</h1>
          <a href={process.env.REACT_APP_LOGIN}>
            <button>Log In</button>
          </a>
          <button>Register</button>
        </nav>
        <header className="landing-header" />
        <section className="about-section-landing">
          <h2>About</h2>
          <p>
            Lorem ipsum dolor amet meh selfies DIY pour-over selvage iceland,
            gentrify drinking vinegar. Iceland austin pop-up street art,
            listicle chillwave vape artisan. Typewriter humblebrag everyday
            carry crucifix, wolf paleo yuccie pitchfork XOXO letterpress green
            juice cliche whatever yr. Mustache deep v master cleanse sustainable
            migas intelligentsia semiotics hashtag vegan.
          </p>
        </section>
        <footer />
      </div>
    );
  }
}
