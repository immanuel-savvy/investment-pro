import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Topup_request from "./topup_request";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Dropdown_menu from "../../components/dropdown_menu";
import { states } from "./withdrawal_requests";

class Topup_requests extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_state: states[0] };
  }

  fetch_requests = async (state) => {
    let { user } = this.props;
    let requests = await post_request("topup_requests", {
      state,
      user: user?._id,
    });

    this.setState({ requests, active_state: state });
  };

  componentDidMount = async () => {
    let { active_state } = this.state;

    await this.fetch_requests(active_state);
  };

  handle_request = async (request, decline) => {
    if (request.state !== "pending") return;

    if (
      !window.confirm(
        `Are you sure to ${decline ? "`Decline`" : "`Approve`"} user request?`
      )
    )
      return;

    let data = {
      value: request.value,
      wallet: request.wallet,
      approve: !decline,
      request: request._id,
      user: request.user?._id,
      currency: request.currency?._id,
    };

    let res = await post_request("topup", data);

    request.state = res && !decline ? "approved" : "declined";

    let { requests } = this.state;
    requests = requests.map((r) => (r._id === request._id ? request : r));

    this.setState({ requests });
  };

  render() {
    let { requests, active_state } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb
          crumb="Topup Requests"
          right_btn={
            <>
              <div
                className={`crs_cates cl_${
                  active_state === "approved"
                    ? "2"
                    : active_state === "declined"
                    ? "1"
                    : "5"
                }`}
              >
                <span style={{ textTransform: "capitalize" }}>
                  {active_state || "All"}
                </span>
              </div>

              <Dropdown_menu
                items={states.map(
                  (state) =>
                    new Object({
                      title: state,
                      action: () => this.fetch_requests(state),
                    })
                )}
              />
            </>
          }
        />
        <div className="row justify-content-center">
          {requests ? (
            requests.length ? (
              requests.map((request) => (
                <Topup_request
                  handle_request={this.handle_request}
                  request={request}
                  key={request._id}
                  in_profile={!!this.props.user}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Topup_requests;
