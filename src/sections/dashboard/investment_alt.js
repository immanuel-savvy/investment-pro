import React from "react";
import Text_btn from "../../components/text_btn";
import {
  commalise_figures,
  time_string,
} from "../../assets/js/utils/functions";
import Modal from "../../components/modal";
import Invest_now from "../../components/invest_now";
import Show_investors from "../../components/show_investors";
import { date_string } from "../../assets/js/utils/functions";
import { post_request } from "../../assets/js/utils/services";

class Investment_alt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  parse_duration = (duration) => {
    duration = Math.abs(Number(duration));

    let str;

    // if (duration > 59) {
    //   str = duration / 60;
    //   if (str * 60 < duration) {
    //     str = `${str} hrs ${duration - str} mins`;
    //   } else str = `${str} hrs`;
    // } else {
    //   str = `${duration} mins`;
    // }
    return `${duration} hrs`;
  };

  cancel_investment = async () => {
    let { investment } = this.props;

    if (!window.confirm("Are you sure to cancel investment?")) return;

    this.setState({ state: "cancelled" });
    await post_request("cancel_investment", {
      user: investment?.user,
      invest: investment?.invest?._id,
      investment: investment?.invest?.investment?._id,
    });
  };

  invest_now = () => this.invest?.toggle();

  show_investors = () => this.investors?.toggle();

  render() {
    let {
      investment: investment_,
      show,
      edit,
      no_btn,
      remove,
      plan,
      no_cancel,
      small,
    } = this.props;
    let { state: state_ } = this.state;
    if (!investment_) return;

    let is_user = investment_?._id?.startsWith("user");
    let investment, amount, state, timestamp;
    if (investment_.invest) {
      investment = investment_.invest.investment;
      amount = investment_.invest.amount;
      timestamp = investment_.invest.timestamp;
      state = investment_.invest.state;
    } else investment = investment_;

    let {
      title,
      investments,
      referral_bonus,
      minimum,
      maximum,
      duration,
      percentage_return,
    } = investment;
    state = state_ || state;

    if (state === "running" && timestamp <= Date.now()) state = "fulfilled";

    return (
      <div
        className={
          no_btn || show
            ? "col-11"
            : small
            ? "col-xl-4 col-lg-4 col-md-6 col-sm-12"
            : "col-xl-6 col-lg-6 col-md-12 col-sm-12"
        }
      >
        <div className="crs_grid_list pl-3 py-3">
          <div className="crs_grid_list_caption">
            {edit || remove ? (
              <>
                <Text_btn text="Remove" action={remove} />
                &nbsp; &nbsp;
                <Text_btn text="Edit" action={edit} />
              </>
            ) : null}
            <div className="crs_lt_102">
              <h4 className="">
                {title}{" "}
                {state ? (
                  <div
                    class={`crs_cates cl_${
                      state === "fulfilled"
                        ? "2"
                        : state === "cancelled"
                        ? "1"
                        : "5"
                    }`}
                  >
                    <span style={{ textTransform: "capitalize" }}>{state}</span>
                  </div>
                ) : null}
              </h4>
            </div>
            <div className="crs_lt_103">
              <div className="">
                <ul>
                  <li>
                    <i className="fa fa-money-bill mr-2"></i>
                    <span>
                      Min ${commalise_figures(minimum)} - $
                      {commalise_figures(maximum)} Max
                    </span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <i className="fa fa-shopping-cart mr-2"></i>
                    <span>Return: {percentage_return}%</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <i className="fa fa-calendar mr-2"></i>
                    <span>Duration: {this.parse_duration(duration)}</span>
                  </li>
                </ul>
                {/* <ul className="mt-1">
                  <li>
                    <i className="fa fa-users mr-2"></i>
                    <span>Total Investments: {investments || 0}</span>
                  </li>
                </ul> */}
                <ul className="mt-1 text-info">
                  <li>
                    <i className="fa fa-info-circle mr-2"></i>
                    <span>{referral_bonus || 5}% Referral Bonus</span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="crs_flex"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <div className="crs_fl_first">
                <div className="crs_price">
                  {amount ? (
                    <h2>
                      <span className="currency">$&nbsp;</span>
                      <span className="theme-cl">{amount}</span>
                    </h2>
                  ) : (
                    <h2>
                      <span className="currency">$&nbsp;</span>
                      <span className="theme-cl">{minimum}</span>
                      <span className="theme-cl">-</span>
                      <span className="theme-cl">{maximum}</span>
                    </h2>
                  )}
                </div>
              </div>
              {no_btn || (is_user && state !== "running") ? null : (
                <div className="crs_fl_last">
                  <div className="crs_linkview">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();

                        if (no_cancel) return;
                        if (show && state !== "running") return;
                        (is_user || show) && state === "running"
                          ? this.cancel_investment()
                          : small || plan
                          ? this.invest_now()
                          : this.show_investors();
                      }}
                      className={`btn btn_view_detail theme-bg text-light`}
                    >
                      {is_user || show
                        ? `${time_string(timestamp)}, ${date_string(timestamp)}`
                        : !edit && !remove
                        ? "Invest Now"
                        : "View Investors"}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Modal ref={(invest) => (this.invest = invest)}>
          <Invest_now investment={investment} toggle={this.invest_now} />
        </Modal>

        <Modal ref={(investors) => (this.investors = investors)}>
          <Show_investors
            toggle={this.show_investors}
            investment={investment}
          />
        </Modal>
      </div>
    );
  }
}

export default Investment_alt;
