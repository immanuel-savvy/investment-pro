import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import User_card from "../../components/user_card";
import Small_btn from "../../components/small_btn";
import { search_object } from "../../assets/js/utils/functions";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let users = await post_request("users");

    this.setState({ users });
  };

  render() {
    let { users, search_param } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="users" />

        <div className="row justify-content-center">
          <div className="form-group col-lg-6 col-md-6 col-xl-4 col-sm-12">
            <div className="input-with-icon mb-2">
              <i className="ti-search"></i>
              <input
                type="text"
                className="form-control"
                style={{ backgroundColor: "#eee" }}
                autoFocus
                placeholder="Search Users"
                onChange={({ target }) =>
                  this.setState({ search_param: target.value })
                }
              />
            </div>

            {/* <div style={{ textAlign: "center" }}>
              <Small_btn title="Search" action={this.search} />
            </div> */}
          </div>
        </div>

        <div className="row mt-2">
          {users ? (
            users.length ? (
              users.map((user) =>
                !search_param ||
                (search_param && search_object(user, search_param)) ? (
                  <User_card user={user} admin key={user._id} />
                ) : null
              )
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Users;
