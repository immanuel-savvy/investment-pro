import React from "react";
import { domain } from "../../assets/js/utils/constants";
import { commalise_figures } from "../../assets/js/utils/functions";

class Topup_request extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { request, handle_request, in_profile } = this.props;
    if (!request) return;

    request = request.request || request;

    let { image, currency, value, user, state } = request;

    return (
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div className="crs_grid_list">
          <div className="crs_grid_list_thumb">
            <a href={`${domain}/images/${image}`} target="_blank">
              <img
                src={`${domain}/images/${image}`}
                className="img-fluid rounded"
                alt=""
              />
            </a>
          </div>

          <div className="crs_grid_list_caption">
            <div class="crs_fl_first mb-1">
              <div
                class={`crs_cates cl_${
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
            <br />
            {state === "pending" && !in_profile ? (
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
                        handle_request(request);
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
      </div>
    );
  }
}

export default Topup_request;
