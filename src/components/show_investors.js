import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { to_title } from "../assets/js/utils/functions";
import Listempty from "./listempty";
import Investment_alt from "../sections/dashboard/investment_alt";
import Loadindicator from "./loadindicator";
import { get_request } from "../assets/js/utils/services";

class Show_investors extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_tab: this.states[0] };
  }

  componentDidMount = async () => {
    let { investment } = this.props;

    let investments = await get_request(
      `investment_invests/${investment?._id}`
    );

    this.setState({ investments });
  };

  states = new Array("running", "fulfilled", "cancelled");

  render() {
    let { toggle } = this.props;
    let { investments, active_tab } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Investors</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            {investments ? (
              investments.length ? (
                <div class="login-form">
                  <Tabs
                    defaultActiveKey={active_tab}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    {this.states.map((tab) => {
                      return (
                        <Tab
                          eventKey={tab}
                          title={`${to_title(tab)}`}
                          key={tab}
                        >
                          <div className="row justify-content-center">
                            {((state) => {
                              return investments
                                .filter((iv) => iv?.invest?.state === state)
                                .map((iv) => (
                                  <Investment_alt
                                    investment={iv}
                                    show
                                    key={iv._id}
                                  />
                                ));
                            })(tab)}
                          </div>
                        </Tab>
                      );
                    })}
                  </Tabs>
                </div>
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Show_investors;
