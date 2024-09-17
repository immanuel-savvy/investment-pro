import React from "react";
import { domain } from "../../assets/js/utils/constants";
import { commalise_figures } from "../../assets/js/utils/functions";
import CopyToClipboard from "react-copy-to-clipboard";
import Modal from "../../components/modal";
import Withdrawal_proof from "./upload_withdrawal_proof";

class Withdrawal_request extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  copy_alert = () => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: true });

    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  toggle_proof = () => this.proof?.toggle();

  render() {
    let { request, handle_request } = this.props;
    if (!request) return;

    request = request.request || request;
    let { copied, image: img } = this.state;

    let { currency, image, value, user, state, address } = request;

    image = image || img;

    return (
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div className="crs_grid_list">
          {image ? (
            <div className="crs_grid_list_thumb">
              <a href={`${domain}/images/${image}`} target="_blank">
                <img
                  src={`${domain}/images/${image}`}
                  className="img-fluid rounded"
                  alt=""
                />
              </a>
            </div>
          ) : null}

          <div className="crs_grid_list_caption m-2">
            <div className="crs_fl_first mb-1">
              <div
                className={`crs_cates cl_${
                  state === "approved" ? "2" : state === "declined" ? "1" : "5"
                }`}
              >
                <span style={{ textTransform: "capitalize" }}>{state}</span>
              </div>
            </div>
            <div className="crs_lt_102">
              <h4 className="crs_tit">{currency?.name}</h4>
            </div>
            <div className="crs_fl_first">
              <div className="crs_price">
                <h2>
                  <span className="currency">$</span>
                  <span className="theme-cl">{commalise_figures(value)}</span>
                </h2>
              </div>
            </div>

            <div className="crs_lt_102">
              User:{" "}
              <h4 className="crs_tit">{`${user?.firstname} ${user.lastname}`}</h4>
              <a
                href={`mailto:${user?.email}`}
                className="crs_tit"
              >{`(${user?.email})`}</a>
            </div>

            <div className="crs_lt_102 py-1">
              Recipient Wallet Address:
              <CopyToClipboard text={address} onCopy={this.copy_alert}>
                <h4 className="crs_tit cursor-pointer">
                  {copied ? "Copied!" : address}
                </h4>
              </CopyToClipboard>
            </div>

            {state === "pending" ? (
              <div className="crs_flex">
                <div className="crs_fl_first">
                  <div className="crs_linkview">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handle_request(request, true);
                      }}
                      href="#"
                      className="btn btn-outline-theme btn_view_detail theme-cl"
                    >
                      Decline
                    </a>
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="crs_fl_last">
                  <div className="crs_linkview">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        this.toggle_proof();
                      }}
                      href="#"
                      className="btn btn_view_detail theme-bg text-light"
                    >
                      Approve
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <Modal ref={(proof) => (this.proof = proof)}>
          <Withdrawal_proof
            toggle={this.toggle_proof}
            submit={(image) => handle_request({ ...request, image })}
          />
        </Modal>
      </div>
    );
  }
}

export default Withdrawal_request;
