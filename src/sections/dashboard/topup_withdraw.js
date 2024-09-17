import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { to_title } from "../../assets/js/utils/functions";
import Padder from "../../components/padder";
import Topup_requests from "./topup_requests";
import Withdrawl_requests from "./withdrawal_requests";

const tabs = (user) =>
  new Object({
    topup_requests: <Topup_requests user={user} />,
    withdrawal_requests: <Withdrawl_requests user={user} />,
  });

class Topup_withdraw extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_tab: "topup_requests" };
  }

  render() {
    let { user } = this.props;
    let { active_tab } = this.state;

    return (
      <div className={user ? "col-12" : "col-lg-9 col-md-9 col-sm-12"}>
        {user ? null : <Padder />}
        {
          <Tabs
            defaultActiveKey={active_tab}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            {Object.keys(tabs()).map((tab) => (
              <Tab
                eventKey={tab}
                title={to_title(tab.replace(/_/g, " "))}
                key={tab}
              >
                {tabs(user)[tab]}
              </Tab>
            ))}
          </Tabs>
        }
      </div>
    );
  }
}

export default Topup_withdraw;
