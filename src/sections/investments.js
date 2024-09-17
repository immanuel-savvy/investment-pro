import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Section_header from "../components/section_headers";
import Investment_alt from "./dashboard/investment_alt";

class Investments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let investments = await get_request("investments");
    this.setState({ investments });
  };

  render() {
    let { investments } = this.state;

    if (investments && !investments.length) return;

    return (
      <section>
        <div className="container">
          <Section_header
            title="our Investments"
            color_title="Plans"
            description="Unlock Your Financial Potential with Smart Investment Choices."
          />
          {!investments ? (
            <Loadindicator />
          ) : (
            <div className="row">
              {investments.map((investment, index) => (
                <Investment_alt
                  small
                  investment={investment}
                  index={index}
                  key={investment._id}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Investments;
