import React from "react";
import Small_btn from "../../components/small_btn";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Modal from "../../components/modal";
import Add_banner from "./add_banner";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Manage_logo from "./manage_logo";
import Banner_component from "./banner_component";
import Padder from "../../components/padder";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { banners, logo } = await get_request("banners_et_logo");

    this.setState({ banners, logo });
  };

  on_add = (banner) => {
    let { banners, banner_in_edit } = this.state;

    if (banner_in_edit)
      banners = banners.map((banner_) =>
        banner_._id === banner_in_edit._id ? banner : banner_
      );
    else banners = new Array(banner, ...banners);

    this.setState({
      banners,
      banner_in_edit: null,
    });
  };

  edit = (banner) =>
    this.setState({ banner_in_edit: banner }, this.toggle_add_banner);

  remove = async (banner) => {
    let { banners } = this.state;

    if (!window.confirm("Are you sure to remove banner?")) return;

    banners = banners.filter((banner_) => banner_._id !== banner);
    this.setState({ banners });

    await post_request(`remove_banner/${banner}`);
  };

  toggle_add_banner = () => this.add_banner?.toggle();

  render() {
    let { banner_in_edit, banners, logo } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Padder />
        <Dashboard_breadcrumb
          crumb="Dashboard"
          right_btn={
            <Small_btn title="Add Banner" action={this.toggle_add_banner} />
          }
        />

        <div className="row mt-5">
          <h4 className="edu_title">Banners</h4>
          {banners ? (
            banners.length ? (
              banners.map((banner) => (
                <Banner_component
                  banner={banner}
                  edit={() => this.edit(banner)}
                  remove={() => this.remove(banner._id)}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
        <hr />

        <div className="row">
          <Manage_logo logo={logo} />
        </div>

        <Modal ref={(add_banner) => (this.add_banner = add_banner)}>
          <Add_banner
            toggle={this.toggle_add_banner}
            banner={banner_in_edit}
            on_add={this.on_add}
          />
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
