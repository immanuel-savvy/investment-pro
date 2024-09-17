import React from "react";
import { commalise_figures } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Dropdown_menu from "./dropdown_menu";
import Loadindicator from "./loadindicator";
import Modal from "./modal";
import Small_btn from "./small_btn";
import Topup from "./topup";
import Withdraw_wallet from "./withdraw_wallet";
import { Loggeduser } from "../Contexts";
import Manage_bank_accounts from "./manage_bank_accounts";
import Credit from "./credit";
import Debit from "./debit";
import Text_btn from "./text_btn";
import Updates from "./updates";

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { user, on_wallet } = this.props;
    let wallet = await post_request(`wallet`, {
      wallet: user.wallet,
      user: user._id,
    });
    this.setState({ wallet }, () => on_wallet && on_wallet(wallet));
  };

  on_withdraw = ({ value }) => {
    let { wallet } = this.state;
    wallet.balance -= value;
    wallet.pending_withdrawal = wallet.pending_withdrawal || 0;
    wallet.pending_withdrawal += value;

    this.setState({ wallet }, this.toggle_withdraw);
  };

  on_credit = (value) => {
    let { wallet } = this.state;

    wallet.balance += value;
    this.setState({ wallet });
  };

  on_debit = (value) => {
    let { wallet } = this.state;

    wallet.balance -= value;
    this.setState({ wallet });
  };

  render_currencies = () => {
    let { wallet } = this.state;
    if (!wallet) return;

    let keys = Array.from(Object.keys(wallet)).filter((f) =>
      f.startsWith("currencies")
    );

    return this.currencies.filter((k) => keys.includes(k._id));
  };

  toggle_bank_accounts = () => this.bank_accounts?.toggle();

  toggle_withdraw = () => this.withdraw?.toggle();

  toggle_topup = () => this.topup?.toggle();

  toggle_credit = () => this.credit?.toggle();

  toggle_updates = () => this.updates?.toggle();

  toggle_debit = () => this.debit?.toggle();

  on_update = (amount) => {
    let { to_update, wallet } = this.state;

    if (to_update === "update_earning") {
      wallet.earnings += amount;
    } else if (to_update === "update_withdrawal") {
      wallet.pending_withdrawal += amount;
    }
    this.setState({ wallet, to_update: null });
  };

  render() {
    let { user, hide, admin, toggle } = this.props;
    let { wallet, to_update } = this.state;

    if (!wallet)
      return (
        <div className="text-center">
          <Loadindicator small />
        </div>
      );

    if (wallet && !wallet._id)
      return (
        <Alert_box
          style={{ marginTop: 15 }}
          message="Cannot fetch wallet at the moment"
        />
      );

    if (hide) return;

    return (
      <Loggeduser.Consumer>
        {({ entry }) => {
          this.currencies = entry?.currencies;

          return (
            <div
              className={
                user ? "col-12 mt-3" : "col-xl-6 col-lg-8 col-md-6 col-sm-12"
              }
            >
              {/* <Modal_form_title title="Wallet" toggle={toggle} /> */}
              <div
                className="dashboard_stats_wrap"
                style={{
                  background: "transparent",
                  border: "1px solid #ccc",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
              >
                <span
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  className={`text-${user ? "dark" : "light"}`}
                >
                  Total Deposit
                </span>
                <div
                  style={{
                    display: "flex",
                    marginTop: 10,
                    marginBottom: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                  <div
                    className={`dashboard_stats_wrap_content text-${
                      user ? "dark" : "light"
                    }`}
                    style={{
                      borderRight: "0.5px solid #ccc",
                      padding: "0 10px",
                    }}
                  >
                    <h6 className="text-${user?'dark':'light'}">$</h6>
                    <h3>
                      {commalise_figures((wallet.balance || 0).toFixed(2))}
                    </h3>
                    <span>Total Earnings</span>
                    <h3>
                      {commalise_figures((wallet.earnings || 0).toFixed(2))}
                    </h3>
                    {admin ? (
                      <Text_btn
                        text="Update"
                        action={() => {
                          this.setState(
                            { to_update: "update_earning" },
                            this.toggle_updates
                          );
                        }}
                      />
                    ) : null}
                    <br />
                    <span>Total Investments</span>
                    <h3>
                      {commalise_figures((wallet.investments || 0).toFixed(2))}
                    </h3>
                    <span>Pending Withdrawal</span>
                    <h3>
                      {commalise_figures(
                        (wallet.pending_withdrawal || 0).toFixed(2)
                      )}
                    </h3>
                    {admin ? (
                      <Text_btn
                        text="Update"
                        action={() => {
                          this.setState(
                            { to_update: "update_withdrawal" },
                            this.toggle_updates
                          );
                        }}
                      />
                    ) : null}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Small_btn
                    title={admin ? "Credit" : "Topup"}
                    action={admin ? this.toggle_credit : this.toggle_topup}
                  />

                  <Small_btn
                    title={admin ? "Debit" : "Withdraw"}
                    action={admin ? this.toggle_debit : this.toggle_withdraw}
                    disabled={wallet.value > 0}
                  />

                  {admin ? null : (
                    <Dropdown_menu
                      items={
                        new Array({
                          title: "manage wallet addresses",
                          action: this.toggle_bank_accounts,
                        })
                      }
                    />
                  )}
                </div>
              </div>

              <Modal ref={(withdraw) => (this.withdraw = withdraw)}>
                <Withdraw_wallet
                  wallet={wallet}
                  on_withdraw={this.on_withdraw}
                  toggle={this.toggle_withdraw}
                />
              </Modal>

              <Modal
                ref={(bank_accounts) => (this.bank_accounts = bank_accounts)}
              >
                <Manage_bank_accounts
                  wallet={wallet}
                  toggle={this.toggle_bank_accounts}
                />
              </Modal>

              <Modal ref={(topup) => (this.topup = topup)}>
                <Topup
                  on_topup={this.on_topup}
                  wallet={wallet}
                  toggle={this.toggle_topup}
                />
              </Modal>

              <Modal ref={(credit) => (this.credit = credit)}>
                <Credit
                  wallet={wallet}
                  on_credit={this.on_credit}
                  toggle={this.toggle_credit}
                  admin={admin}
                />
              </Modal>

              <Modal ref={(debit) => (this.debit = debit)}>
                <Debit
                  wallet={wallet}
                  on_debit={this.on_debit}
                  toggle={this.toggle_debit}
                  admin={admin}
                />
              </Modal>

              <Modal ref={(updates) => (this.updates = updates)}>
                <Updates
                  wallet={wallet}
                  on={this.on_update}
                  route={to_update}
                  toggle={this.toggle_updates}
                  admin={admin}
                />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Wallet;
