import React from "react";
import axios from "axios";
import AppBar from "material-ui/AppBar";

export default class Landing extends React.Component {
  handleLogin() {}

  render() {
    return (
      <div className="landing-page">
        <header className="landing-header">
          <nav>
            <h1>Creative App Title</h1>
            <a href={process.env.REACT_APP_LOGIN}>
              <button>Login</button>
            </a>
          </nav>
        </header>

        <section className="about-section-landing">
          <h2>About</h2>
          <p className='about-text'>
            Lorem ipsum dolor amet fashion axe iceland vape single-origin coffee
            try-hard photo booth keffiyeh hexagon food truck church-key VHS palo
            santo gentrify. Crucifix enamel pin waistcoat, keytar semiotics
            ramps ennui. Migas art party put a bird on it, sustainable forage
            direct trade tattooed thundercats helvetica vaporware taiyaki. Fanny
            pack gastropub neutra migas, man braid pabst church-key polaroid
            gluten-free chia. Fanny pack ugh before they sold out mustache
            post-ironic chia direct trade man bun meditation locavore. Man bun
            gochujang bicycle rights actually kitsch activated charcoal
            farm-to-table deep v stumptown banjo flannel bespoke tote bag
            fingerstache.
          </p> <p>Oh. You need a little dummy text for your mockup? How
            quaint.</p>
        </section>

        <section className='section-two'>
        </section>
        
        <footer>
          <div />
        </footer>
      </div>
    );
  }
}
