import React from "react";
import Modal from "./modal";
import Text_btn from "./text_btn";
import Wallet from "./wallet";

class User_card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_wallet = () => this.wallet?.toggle();

  render() {
    let { user, admin } = this.props;
    let { firstname, lastname, email } = user;

    return (
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div className="crs_trt_grid">
          <div className="crs_trt_caption">
            <div className="instructor_title">
              <h4>
                <span>{`${firstname} ${lastname}`}</span>
              </h4>
            </div>
            <p>{email}</p>
          </div>

          {admin ? (
            <div className="crs_trt_footer">
              {
                <div className="crs_trt_ent">
                  <Text_btn text="Wallet" action={this.toggle_wallet} />
                </div>
              }
            </div>
          ) : null}
        </div>

        <Modal ref={(wallet) => (this.wallet = wallet)}>
          <Wallet admin={admin} user={user} toggle={this.toggle_wallet} />
        </Modal>
      </div>
    );
  }
}

export default User_card;
