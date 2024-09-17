import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Section_header from "../components/section_headers";
import Team_member from "../components/team_member";

class Management_team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let team_members = await get_request("team_members");

    this.setState({ team_members });
  };

  render() {
    let { team_members } = this.state;

    if (team_members && !team_members.length) return;

    return (
      <section class="min gray">
        <div class="container">
          <Section_header
            title="Meet our Expert"
            color_title="Management Team"
            description="Our management teams consist of experienced professionals with a wealth of knowledge and expertise in their respective fields."
          />

          <div class="row justify-content-center">
            {team_members ? (
              team_members.map((member) => (
                <Team_member member={member} key={member._id} />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Management_team;
