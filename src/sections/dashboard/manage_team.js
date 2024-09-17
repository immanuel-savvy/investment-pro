import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Team_member from "../../components/team_member";
import Add_team_member from "./add_team_member";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let teams = await get_request("team_members");

    if (!Array.isArray(teams)) teams = new Array();

    this.setState({ teams });
  };

  toggle_add_team = () => this.team?.toggle();

  on_add = (member) => {
    let { teams, member_in_edit } = this.state;

    if (member_in_edit)
      teams = teams.map((team) =>
        team._id === member_in_edit._id ? member : team
      );
    else teams = new Array(member, ...teams);

    this.setState({
      teams,
      member_in_edit: null,
    });
  };

  edit = (member) => {
    this.setState({ member_in_edit: member }, this.toggle_add_team);
  };

  remove = async (member) => {
    let { teams } = this.state;

    if (!window.confirm("Are you sure to remove team member?")) return;

    teams = teams.filter((team) => team._id !== member._id);
    this.setState({ teams });

    await post_request(`remove_team_member/${member._id}`);
  };

  render() {
    let { teams, member_in_edit } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb
          crumb="manage team"
          right_btn={
            <Small_btn title="Add Team Member" action={this.toggle_add_team} />
          }
        />
        <div className="row justify-content-center">
          {teams ? (
            teams.length ? (
              teams.map((member) => (
                <Team_member
                  edit={this.edit}
                  remove={this.remove}
                  member={member}
                  key={member._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(team) => (this.team = team)}>
          <Add_team_member
            member={member_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_team}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_team;
