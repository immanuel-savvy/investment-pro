import React from "react";
import { get_request } from "../assets/js/utils/services";
import Contact_us from "../components/contact_us_today";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";
import Investment_alt from "../sections/dashboard/investment_alt";

class Plans extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetch_plans = async () => {
    let investments = await get_request("investments");

    this.setState({ investments });
  };

  componentDidMount = async () => {
    scroll_to_top();
    await this.fetch_plans();
  };

  render() {
    let { investments } = this.state;

    return (
      <div id="main-wrapper">
        <Custom_nav page="blog" />
        <Padder />
        <Breadcrumb_banner title="Investments" page="Plans" />
        <section class="min">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Investment <span class="theme-cl">Plans</span>
                  </h2>
                  <p>
                    Unlock Your Financial Potential with Smart Investment
                    Choices.
                  </p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              {investments ? (
                investments.length ? (
                  investments.map((investment) => (
                    <Investment_alt
                      plan
                      investment={investment}
                      key={investment._id}
                    />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>
        </section>

        <Contact_us />
        <Footer />
      </div>
    );
  }
}

export default Plans;
