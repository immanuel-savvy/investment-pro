import React from "react";
import { Link } from "react-router-dom";

class Contact_us extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return;

    return (
      <section class="theme-bg call_action_wrap-wrap">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="call_action_wrap">
                <div class="call_action_wrap-head">
                  <h3>For Sponsorship and Inquiries?</h3>
                  <span>We'll help you to grow your career and growth.</span>
                </div>
                <Link to="/contact" class="btn btn-call_action_wrap">
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact_us;
