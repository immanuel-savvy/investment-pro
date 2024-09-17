import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Add_investment from "./add_investment";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Investment_alt from "./investment_alt";
import Padder from "../../components/padder";

class Manage_investment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let investments = await get_request("investments");

    if (!Array.isArray(investments)) investments = new Array();

    this.setState({ investments });
  };

  toggle_add_investment = () => this.investment?.toggle();

  on_add = (investment) => {
    let { investments, investment_in_edit } = this.state;

    if (investment_in_edit)
      investments = investments.map((investment_) =>
        investment_._id === investment_in_edit._id ? investment : investment_
      );
    else investments = new Array(investment, ...investments);

    this.setState({
      investments,
      investment_in_edit: null,
    });
  };

  edit = (investment) => {
    this.setState(
      { investment_in_edit: investment },
      this.toggle_add_investment
    );
  };

  remove = async (investment) => {
    let { investments } = this.state;

    if (!window.confirm("Are you sure to remove investment?")) return;

    investments = investments.filter(
      (investment_) => investment_._id !== investment._id
    );
    this.setState({ investments });

    await post_request(`remove_investment/${investment._id}`);
  };

  render() {
    let { investments, investment_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Padder />
        <Dashboard_breadcrumb
          crumb="manage investments"
          right_btn={
            <Small_btn
              title="Add Investment"
              action={this.toggle_add_investment}
            />
          }
        />
        <div className="row justify-content-center">
          {investments ? (
            investments.length ? (
              investments.map((investment) => (
                <Investment_alt
                  investment={investment}
                  edit={() => this.edit(investment)}
                  remove={() => this.remove(investment)}
                  key={investment._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(investment) => (this.investment = investment)}>
          <Add_investment
            investment={investment_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_investment}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_investment;
