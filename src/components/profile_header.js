import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { mask_id, to_title } from "../assets/js/utils/functions";
import CopyToClipboard from "react-copy-to-clipboard";
import { emitter } from "../App";

const panels = new Array("investments", "transactions");

class Dash_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get_verified = () => {
    let { user } = this.props;

    window.location.assign(`${client_domain}/get_verified/${user._id}`);
  };

  toggle_kyc_docs = () => this.kyc_docs?.toggle();

  render() {
    let { user, set_panel } = this.props;
    let { firstname, lastname, email, _id } = user;

    return (
      <div className="d-user-avater">
        <img
          src={require("../assets/img/user_image_placeholder.png")}
          className="img-fluid avater"
          alt=""
        />
        <h4>{to_title(`${firstname} ${lastname}`)} </h4>
        <span>{email}</span>

        <div className="elso_syu89"></div>
        <div className="elso_syu77 mx-5">
          {panels.map((panel) => (
            <div
              onClick={() => set_panel(panel)}
              key={panel}
              className="one_third cursor-pointer"
            >
              <div className="one_45ic text-info bg-light-info">
                <i className="fas fa-star"></i>
              </div>
              <span>{to_title(panel)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dash_header;
export { panels };
