import React from "react";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Alert_box from "./alert_box";
import Text_input from "./text_input";
import { post_request } from "../assets/js/utils/services";

class Debit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  proceed = async () => {
    let { wallet, toggle, on_debit } = this.props;
    let { value } = this.state;

    value = Number(value);
    if (value <= 0)
      return this.setState({ message: "Value cannot be less than zero" });
    let res = await post_request("debit_wallet", {
      wallet: wallet._id,
      value: Number(value),
    });

    if (res?.ok) {
      on_debit && on_debit(value);
      toggle();
    } else
      this.setState({
        message: res?.message || "Err: Could not debit wallet.",
      });
  };

  render() {
    let { toggle, wallet } = this.props;
    let { value, message, updating } = this.state;

    return (
      <section style={{ paddingTop: 20 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <form>
                <div className="crs_log_wrap">
                  <Modal_form_title title="Debit Wallet" toggle={toggle} />

                  <Text_input
                    value={value}
                    type="number"
                    title="Value ($)"
                    action={(value) =>
                      this.setState({
                        value,
                        message: "",
                      })
                    }
                    important
                  />

                  <Alert_box message={message} />

                  <Stretch_button
                    title="Debit"
                    disabled={
                      !/[0-9]{1,}/.test(value) &&
                      value &&
                      Math.abs(Number(value)) <= wallet?.balance
                    }
                    loading={updating}
                    action={this.proceed}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Debit;
