import React from "react";
import Modal from "./modal";
import Wallet from "./wallet";
import Topup from "./topup";
import Withdraw_wallet from "./withdraw_wallet";
import Divs from "./divs";
import Modal_form_title from "./modal_form_title";
import CopyToClipboard from "react-copy-to-clipboard";
import { mask_id } from "../assets/js/utils/functions";
import { client_domain } from "../assets/js/utils/constants";

class User_profile_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_wallet = () => this.wall?.toggle();

  toggle_topup = () => this.topup?.toggle();

  toggle_withdraw = () => this.withdraw?.toggle();

  toggle_converter = () => this.convert?.toggle();

  render() {
    let { user } = this.props;
    if (!user) return;

    let { _id, referrals } = user;

    let referral_link = `${client_domain}/signup?ref=${mask_id(_id)}`;

    return (
      <section className="p-0">
        <div className="">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="crp_box ovr_top">
                <div className="row align-items-center m-0">
                  <div className="col-xl-2 col-lg-3 col-md-2 col-sm-12">
                    <div
                      className="crt_169 cat-1 edu_cat_2"
                      style={{ marginBottom: 10 }}
                      onClick={this.toggle_wallet}
                    >
                      <div className="crt_overt style_2">
                        <i className="fa fa-wallet"></i>
                      </div>
                      <div className="crt_io90">
                        <h6>View Wallet</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-2 col-sm-4">
                    <div
                      className="crt_169 cat-1 edu_cat_2"
                      style={{ marginBottom: 10 }}
                      onClick={this.toggle_topup}
                    >
                      <div className="crt_overt style_2">
                        <i className="fa fa-plus"></i>
                      </div>
                      <div className="crt_io90">
                        <h6>Topup</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-2 col-sm-4">
                    <div
                      className="crt_169 cat-1 edu_cat_2"
                      style={{ marginBottom: 10 }}
                      onClick={this.toggle_withdraw}
                    >
                      <div className="crt_overt style_2">
                        <i className="fa fa-plus"></i>
                      </div>
                      <div className="crt_io90">
                        <h6>Withdraw</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-2 col-sm-4">
                    <div
                      className="crt_169 cat-1 edu_cat_2"
                      style={{ marginBottom: 10 }}
                      onClick={this.toggle_converter}
                    >
                      <div className="crt_overt style_2">
                        <i className="fa fa-recycle"></i>
                      </div>
                      <div className="crt_io90">
                        <h6>Converter</h6>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-4">
                      <div
                        className="crt_169 cat-1 edu_cat_2"
                        style={{ marginBottom: 10 }}
                      >
                        <div className="crt_overt style_2">
                          {referrals || 0}
                        </div>
                        <div className="crt_io90">
                          <h6>Total Referrals</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="dro_140">
                        <div className="dro_141 st-1">
                          <i className="fa fa-link"></i>
                        </div>
                        <div className="dro_142">
                          <h6>
                            Referral Link
                            <br />
                            <CopyToClipboard text={referral_link}>
                              <span
                                style={{
                                  textTransform: "none",
                                  cursor: "pointer",
                                  wordWrap: "break-word",
                                  flexWrap: "wrap",
                                }}
                              >
                                {referral_link}
                                &nbsp; &nbsp;
                                <i className="fa fa-copy"></i>
                              </span>
                            </CopyToClipboard>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(wall) => (this.wall = wall)}>
          <Wallet user={user} toggle={this.toggle_wallet} />
        </Modal>
        <Modal ref={(topup) => (this.topup = topup)}>
          <Topup user={user} toggle={this.toggle_topup} />
        </Modal>
        <Modal ref={(withdraw) => (this.withdraw = withdraw)}>
          <Withdraw_wallet user={user} toggle={this.toggle_withdraw} />
        </Modal>
        <Modal ref={(convert) => (this.convert = convert)}>
          <section style={{ paddingTop: 20, paddingBottom: 20 }}>
            <div className="container-fluid">
              <Modal_form_title
                toggle={this.toggle_converter}
                title="Converter"
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Divs d={3} />
              </div>
            </div>
          </section>
        </Modal>
      </section>
    );
  }
}

export default User_profile_header;
