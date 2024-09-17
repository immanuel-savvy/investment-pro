import React from "react";
import { post_request } from "../assets/js/utils/services";
import Bank_account from "./bank_account";
import Manage_bank_accounts from "./manage_bank_accounts";
import Modal from "./modal";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";
import { Loggeduser } from "../Contexts";
import Loadindicator from "./loadindicator";

class Withdraw_wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { wallet, user } = this.props;
    if (!wallet)
      wallet = await post_request(`wallet`, {
        wallet: this.loggeduser?.wallet || user?.wallet,
      });
    this.setState({ wallet });
  };

  set_address = (address) =>
    this.setState({ address }, this.toggle_select_address);

  is_set = () => {
    let { value, address, wallet } = this.state;

    return address && Number(value) > 0 && Number(value) <= wallet.balance;
  };

  toggle_select_address = () => this.addresses?.toggle();

  withdraw = async () => {
    let { on_withdraw, toggle } = this.props;
    let { value, address } = this.state;

    this.setState({ loading: true });

    let details = {
      value,
      user: this.loggeduser?._id,
      wallet: this.loggeduser?.wallet,
      address: address && address.wallet_address,
    };

    let result = await post_request("withdrawal_request", details);

    if (result?._id) {
      on_withdraw && on_withdraw({ value });
      !on_withdraw && toggle();
    } else
      this.setState({
        loading: false,
        message:
          (result && result.message) || "Cannot withdraw wallet at the moment.",
      });
  };

  render() {
    let { toggle } = this.props;
    let { value, loading, address, wallet } = this.state;

    if (!wallet) return <Loadindicator />;

    return (
      <Loggeduser.Consumer>
        {({ entry, loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <section style={{ paddingTop: 20, paddingBottom: 20 }}>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form>
                      <div className="crs_log_wrap">
                        <Modal_form_title title="withdraw" toggle={toggle} />

                        <>
                          <Text_input
                            value={value}
                            type="number"
                            title="Amount ($)"
                            action={(value) =>
                              this.setState({
                                value,
                                message: "",
                              })
                            }
                            info={
                              wallet.balance < Number(value)
                                ? `Insufficient currency`
                                : ""
                            }
                            important
                          />

                          <div style={{ textAlign: "center" }}>
                            <Text_btn
                              text="Select Address"
                              // icon="fa-cursor"
                              style={{
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                              action={this.toggle_select_address}
                            />
                          </div>

                          {address ? <Bank_account address={address} /> : null}

                          <Stretch_button
                            title="Withdraw"
                            action={this.withdraw}
                            disabled={!this.is_set()}
                            loading={loading}
                          />
                        </>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <Modal ref={(addresses) => (this.addresses = addresses)}>
                <Manage_bank_accounts
                  wallet={wallet}
                  toggle={this.toggle_select_address}
                  on_select={this.set_address}
                />
              </Modal>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Withdraw_wallet;
