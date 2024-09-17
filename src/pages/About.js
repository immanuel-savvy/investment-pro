import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import { get_request } from "../assets/js/utils/services";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";
import Testimonials from "../sections/testimonials";
import Who_we_are from "../sections/who_we_are";
import Management_team from "../sections/management_team";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    scroll_to_top();
    document.title = `About | ${organisation_name}`;

    let about_statement = await get_request("about_statement");

    this.setState({ about_statement });
  };

  render() {
    let { about_statement } = this.state;

    return (
      <div>
        <Custom_nav page="about" />
        <Padder />

        <Breadcrumb_banner title="Who we are?" page="About Us" />

        {about_statement ? (
          <>
            <Who_we_are about={about_statement} />
          </>
        ) : (
          <Loadindicator contained />
        )}

        <Management_team />

        <Testimonials />

        <Contact_us />

        <Footer />
      </div>
    );
  }
}

export default About;
