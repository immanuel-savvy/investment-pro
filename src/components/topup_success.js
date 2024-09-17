import React from "react";
import Modal_form_title from "./modal_form_title";

class Topup_success extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { toggle, details } = this.props;

    return (
      <div class="modal-content overli" id="loginmodal">
        <Modal_form_title title="Topup Request" toggle={toggle} />

        <div class="modal-body">
          <div class="login-form">
            <div
              style={{
                textAlign: "center",
                boxShadow: `rgba(0, 0, 0, 0.3) 5px 5px 12px`,
                borderRadius: 20,
                padding: 20,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 20,
              }}
            >
              <img
                src={require("../assets/img/ic-2.png")}
                class="img-fluid"
                alt=""
              />
              <p>Hello,</p>
              <h4>your topup request has been sent successfully</h4>
              <p>
                Our admin would verify your transaction shortly and reflect your
                account accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Topup_success;
