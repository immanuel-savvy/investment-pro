import React from "react";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Alert_box from "./alert_box";
import Text_input from "./text_input";
import { post_request } from "../assets/js/utils/services";

class Updates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  proceed = async () => {
    let { wallet, toggle, on, route } = this.props;
    let { value } = this.state;

    value = Number(value);
    if (isNaN(value))
      return this.setState({ message: "Value must be a valid number" });
    let res = await post_request(route, {
      wallet: wallet._id,
      amount: Number(value),
    });

    if (res?.ok) {
      on && on(value);
      toggle();
    } else
      this.setState({
        message: res?.message || "Err, something went wrong.",
      });
  };

  render() {
    let { toggle, route } = this.props;
    let { value, message, updating } = this.state;

    return (
      <section style={{ paddingTop: 20 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <form>
                <div className="crs_log_wrap">
                  <Modal_form_title
                    title={route && route.replace(/_/g, " ")}
                    toggle={toggle}
                  />

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
                    title="Update"
                    disabled={!value.trim()}
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

export default Updates;
