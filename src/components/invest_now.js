import React from "react";
import Handle_file_upload from "./handle_file_upload";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import { post_request } from "../assets/js/utils/services";
import Investment_alt from "../sections/dashboard/investment_alt";
import { Loggeduser } from "../Contexts";
import Login from "./login";
import { get_session } from "../sections/footer";
import { client_domain } from "../assets/js/utils/constants";
import Alert_box from "./alert_box";

class Invest_now extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { banner } = this.props;
    this.state = {
      title: "",
      sub_text: "",
      login: true,
      ...banner,
      user: get_session("loggeduser"),
    };
  }

  invest = async () => {
    let { toggle, investment } = this.props;
    let { amount, user } = this.state;
    this.setState({ loading: true });

    if (!user) return this.setState({ message: "Please login." });

    let invest = {
      amount: Number(amount),
      user: user?._id,
      investment: investment?._id,
      percentage_return: investment?.percentage_return,
      wallet: user?.wallet,
      currency: investment?.currency?._id,
    };

    let result = await post_request("invest", invest);

    if (result?._id) {
      invest._id = result._id;
      invest.created = result.created;

      toggle();
      window.location.assign(`${client_domain}/profile?u=${user._id}`);
    } else {
      this.setState({
        message: result?.message || "Cannot create investment at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle, investment } = this.props;
    let { amount, loading, user, login, message } = this.state;
    let { minimum, maximum } = investment;

    return (
      <Loggeduser.Consumer>
        {() => {
          if (!user && login)
            return (
              <Login
                toggle={() => this.setState({ login: false }, toggle)}
                no_redirect
              />
            );

          return (
            <div>
              <div className="modal-content overli" id="loginmodal">
                <Modal_form_title title="Invest Now" toggle={toggle} />

                <div className="modal-body">
                  <Investment_alt investment={investment} no_btn />

                  <div className="login-form">
                    <form>
                      <div className="form-group">
                        <label>Amount</label>
                        <div className="input-with-icon">
                          <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={({ target }) =>
                              this.setState({
                                amount: target.value,
                                message: "",
                              })
                            }
                            placeholder="Amount"
                          />
                          <i className="ti-text"></i>
                        </div>
                      </div>

                      <Alert_box message={message} />

                      <div className="form-group">
                        <Stretch_button
                          disabled={
                            !Number(amount) ||
                            Number(amount) < minimum ||
                            Number(amount) > maximum
                          }
                          loading={loading}
                          title={"Invest"}
                          action={this.invest}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Invest_now;
