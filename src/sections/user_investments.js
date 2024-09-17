import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Listempty from "../components/listempty";
import Investment_alt from "./dashboard/investment_alt";

class User_investments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { user } = this.props;

    let investments = await get_request(`user_invests/${user._id}`);
    this.setState({ investments });
  };

  on_cancel = (investment) => {
    let { investments } = this.state;

    investments = investments.map((i) => {
      if (i._id === investment._id) i.invest.state = "cancelled";
      return i;
    });
    this.setState({ investments });
  };

  render() {
    let { investments } = this.state;

    return (
      <section className="min">
        <div className="container">
          <div className="row justify-content-center">
            {investments ? (
              investments.length ? (
                investments.map((investment) => (
                  <Investment_alt
                    on_cancel={this.on_cancel}
                    investment={investment}
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
      </section>
    );
  }
}

export default User_investments;
