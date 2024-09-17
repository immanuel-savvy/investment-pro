import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Currency from "../../components/currency";
import Add_currency from "./add_currency";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_cryptocurrencies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let currencies = await get_request("currencies");

    if (!Array.isArray(currencies)) currencies = new Array();

    this.setState({ currencies });
  };

  toggle_add_currency = () => this.currency?.toggle();

  on_add = (currency) => {
    let { currencies, currency_in_edit } = this.state;

    if (currency_in_edit)
      currencies = currencies.map((currency_) =>
        currency_._id === currency_in_edit._id ? currency : currency_
      );
    else currencies = new Array(currency, ...currencies);

    this.setState({
      currencies,
      currency_in_edit: null,
    });
  };

  edit = (currency) => {
    this.setState({ currency_in_edit: currency }, this.toggle_add_currency);
  };

  remove = async (currency) => {
    let { currencies } = this.state;

    if (!window.confirm("Are you sure to remove currency?")) return;

    currencies = currencies.filter(
      (currency_) => currency_._id !== currency._id
    );
    this.setState({ currencies });

    await post_request(`remove_currency/${currency._id}`);
  };

  render() {
    let { currencies, currency_in_edit } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb
          crumb="manage currencies"
          right_btn={
            <Small_btn title="Add Currency" action={this.toggle_add_currency} />
          }
        />
        <div className="row justify-content-center">
          {currencies ? (
            currencies.length ? (
              currencies.map((currency) => (
                <Currency
                  currency={currency}
                  edit={this.edit}
                  remove={this.remove}
                  key={currency._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(currency) => (this.currency = currency)}>
          <Add_currency
            currency={currency_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_currency}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_cryptocurrencies;
