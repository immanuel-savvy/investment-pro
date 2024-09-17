import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Manage_testimonial_overview from "./manage_testimonial_overview";
import Manage_about_statement from "./manage_about_statement";
import Manage_vision_mission_statement from "./manage_vision_mission_statement";
import { to_title } from "../../assets/js/utils/functions";
import Padder from "../../components/padder";
import Manage_cryptocurrencies from "./manage_cryptocurrencies";
import Manage_team from "./manage_team";

const tabs = new Object({
  about_statement: <Manage_about_statement />,
  testimonial_overview: <Manage_testimonial_overview />,
  manage_currencies: <Manage_cryptocurrencies />,
  vision_mission_statement: <Manage_vision_mission_statement />,
  manage_team: <Manage_team />,
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_tab: "about_statement" };
  }

  render() {
    let { active_tab } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Padder />
        {
          <Tabs
            defaultActiveKey={active_tab}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            {Object.keys(tabs).map((tab) => (
              <Tab
                eventKey={tab}
                title={to_title(tab.replace(/_/g, " "))}
                key={tab}
              >
                {tabs[tab]}
              </Tab>
            ))}
          </Tabs>
        }
      </div>
    );
  }
}

export default Settings;
