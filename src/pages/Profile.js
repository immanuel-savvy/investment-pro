import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import Dash_header, { panels } from "../components/profile_header";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer, { get_session, scroll_to_top } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import User_investments from "../sections/user_investments";
import User_profile_header from "../components/user_profile_header";
import Topup_withdraw from "../sections/dashboard/topup_withdraw";
import Divs from "../components/divs";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { panel: panels[0] };
  }

  componentDidMount = () => {
    if (!this.loggeduser) this.loggeduser = get_session("loggeduser");
    if (!this.loggeduser) window.location.assign(client_domain);

    scroll_to_top();
  };

  set_panel = (panel) => this.setState({ panel });

  render() {
    let { panel } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!loggeduser) return;

          return (
            <div id="main-wrapper">
              <Custom_Nav page="vendor" />
              <Padder />

              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-3 col-md-3">
                      <div className="Profile-navbar">
                        <Dash_header
                          user={loggeduser}
                          set_panel={this.set_panel}
                        />
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12">
                      <Padder />
                      <User_profile_header user={loggeduser} />

                      <div className="row mt-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 pb-4">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {to_title(panel)}
                              </li>
                            </ol>
                          </nav>
                        </div>
                      </div>

                      {panel === panels[0] ? (
                        <User_investments user={loggeduser} />
                      ) : panel === panels[2] ? (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Divs d={3} />
                        </div>
                      ) : (
                        <Topup_withdraw user={loggeduser} />
                      )}
                    </div>
                  </div>
                </div>
              </section>
              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Profile;
