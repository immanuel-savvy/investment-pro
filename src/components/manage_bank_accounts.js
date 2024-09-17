import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import Bank_account from "./bank_account";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import { Loggeduser } from "../Contexts";
import Small_btn from "./small_btn";

class Manage_bank_accounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  is_set = () => {
    let { currency, wallet_address } = this.state;

    return !currency || !wallet_address;
  };

  set_bank = ({ target }) => this.setState({ currency: target.value });

  add_address = async () => {
    let { wallet } = this.props;
    let { currency, wallet_address } = this.state;

    this.setState({ loading: true });

    let currency_ = this.currencies.find((bank_) => bank_._id == currency);

    let address = { currency, wallet_address, wallet: wallet._id };

    let result = await post_request("add_address", address);

    if (result._id) {
      address._id = result._id;
      address.created = result.created;
      let { addresses } = this.state;
      address.currency = currency_;
      addresses = new Array(address, ...addresses);

      this.setState({ addresses, loading: false, new_account: false });
    } else
      this.setState({
        loading: false,
        message:
          (result && result.message) || "Cannot add currency at the moment.",
      });
  };

  componentDidMount = async () => {
    let { wallet, toggle } = this.props;

    if (!wallet) return toggle && toggle();
    let addresses = await get_request(`wallet_addresses/${wallet._id}`);

    this.setState({ addresses });
  };

  toggle_new_account = () =>
    this.setState({ new_account: !this.state.new_account }, () => {
      let { new_account, addresses } = this.state;
      new_account && !addresses && this.fetch_banks();
    });

  render() {
    let { toggle, on_select } = this.props;
    let { addresses, wallet_address, new_account, loading } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ entry }) => {
          let { currencies } = entry || new Object();
          this.currencies = currencies;

          return (
            <section style={{ paddingTop: 20, paddingBottom: 20 }}>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form>
                      <div className="crs_log_wrap">
                        <div className="crs_log__thumb">
                          <img
                            src={require(`../assets/img/vouchers1.png`)}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="crs_log__caption">
                          <div className="rcs_log_123">
                            <div className="rcs_ico">
                              <i className="fas fa-users"></i>
                            </div>
                          </div>
                        </div>

                        <Modal_form_title
                          title="manage wallet addresses"
                          toggle={toggle}
                        />

                        <>
                          {addresses ? (
                            addresses.length ? (
                              addresses.map((address) => {
                                if (this.currencies)
                                  address.currency = this.currencies?.find(
                                    (curr) => curr._id === address.currency
                                  );
                                return (
                                  <Bank_account
                                    address={address}
                                    action={on_select}
                                    key={address._id}
                                  />
                                );
                              })
                            ) : (
                              <Listempty text="No addresses yet" />
                            )
                          ) : (
                            <Loadindicator />
                          )}

                          <div style={{ margin: "0 10px", textAlign: "right" }}>
                            <Small_btn
                              title="Add Account"
                              action={this.toggle_new_account}
                            />
                          </div>

                          {new_account ? (
                            <>
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 form-group smalls">
                                <label>Bank</label>
                                {currencies ? (
                                  currencies.length ? (
                                    <div className="simple-input">
                                      <select
                                        id="currency"
                                        onChange={({ target }) =>
                                          this.setState({
                                            currency: target.value,
                                          })
                                        }
                                        className="form-control"
                                      >
                                        <option value="" disabled selected>
                                          -- Select your currency --
                                        </option>
                                        {currencies.map((currency) => (
                                          <option
                                            key={currency._id}
                                            value={currency._id}
                                          >
                                            {to_title(
                                              currency.name.replace(/_/g, " ")
                                            )}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  ) : (
                                    <Listempty text="Cannot get currencies." />
                                  )
                                ) : (
                                  <Loadindicator smalls />
                                )}
                              </div>

                              <Text_input
                                value={wallet_address}
                                title="wallet address"
                                action={(wallet_address) =>
                                  this.setState({
                                    wallet_address,
                                    message: "",
                                  })
                                }
                                type="text"
                                important
                              />

                              <Stretch_button
                                loading={loading}
                                title="Add"
                                action={this.add_address}
                                disabled={!this.is_set}
                              />
                            </>
                          ) : null}
                        </>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Manage_bank_accounts;
