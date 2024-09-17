import React from "react";
import { domain } from "../../assets/js/utils/constants";
import { get_request, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Stretch_button from "../../components/stretch_button";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_vision_mission_statement extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {
      vision_title: "Vision Statement",
      mission_title: "Mission Statement",
    };
  }

  componentDidMount = async () => {
    let data = await get_request("mission_vision_statement");

    this.setState({ ...data?.mission, ...data?.vision });
  };

  update_vision = async () => {
    let { vision_statement, vision, vision_title, vision_file_hash } =
      this.state;

    this.setState({ updating_vision: true });

    let res = await post_request("update_vision", {
      vision_statement,
      vision,
      vision_title,
      vision_file_hash,
    });

    this.setState({ updating_vision: false, vision: res?.vision });
  };

  update_mission = async () => {
    let { mission_statement, mission_title, mission, mission_file_hash } =
      this.state;

    this.setState({ updating_mission: true });

    let res = await post_request("update_mission", {
      mission_statement,
      mission,
      mission_title,
      mission_file_hash,
    });

    this.setState({ updating_mission: false, mission: res?.mission });
  };

  render() {
    let {
      vision_statement,
      mission_statement,
      vision,
      vision_file_loading,
      mission,
      mission_file_loading,
      updating_mission,
      updating_vision,
      vision_title,
      mission_title,
    } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb crumb="manage vision - mission statement" />
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-6 col-sm-12">
            <div className="crs_grid">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Vision Statement</h5>
              </div>

              <div className="modal-body">
                <div className="login-form">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Title</label>
                          <div className="input-with-icon">
                            <input
                              type="text"
                              className="form-control"
                              value={vision_title}
                              onChange={({ target }) =>
                                this.setState({
                                  vision_title: target.value,
                                  message: "",
                                })
                              }
                              placeholder="Full Name"
                            />
                            <i className="ti-text"></i>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Vision Statement</label>
                          <textarea
                            className="form-control"
                            type="number"
                            placeholder="Vision Statement..."
                            value={vision_statement}
                            onChange={({ target }) =>
                              this.setState({ vision_statement: target.value })
                            }
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-group smalls">
                        <label>Vision Image (1200 x 800)*</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            accept="image/*"
                            onChange={(e) =>
                              this.handle_file(e, "vision", null, null, true)
                            }
                          />
                          <label className="custom-file-label" for="customFile">
                            Choose Image
                          </label>
                        </div>
                        {vision_file_loading ? (
                          <Loadindicator />
                        ) : (
                          <div style={{ overflow: "scroll" }}>
                            <span>
                              <img
                                className="py-3 rounded"
                                style={{
                                  maxHeight: 200,
                                  maxWidth: 200,
                                  marginRight: 10,
                                }}
                                src={
                                  vision && vision.startsWith("data")
                                    ? vision
                                    : `${domain}/images/${vision}`
                                }
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Stretch_button
                      loading={updating_vision}
                      title="Update Vision Statement"
                      style={{ backgroundColor: "yellow" }}
                      action={this.update_vision}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 col-lg-8 col-xl-6 col-sm-12">
            <div className="crs_grid">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Mission Statement</h5>
              </div>

              <div className="modal-body">
                <div className="login-form">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Title</label>
                          <div className="input-with-icon">
                            <input
                              type="text"
                              className="form-control"
                              value={mission_title}
                              onChange={({ target }) =>
                                this.setState({
                                  mission_title: target.value,
                                  message: "",
                                })
                              }
                              placeholder="Full Name"
                            />
                            <i className="ti-text"></i>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Mission Statement</label>
                          <textarea
                            className="form-control"
                            type="number"
                            placeholder="Mission Statement..."
                            value={mission_statement}
                            onChange={({ target }) =>
                              this.setState({ mission_statement: target.value })
                            }
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-group smalls">
                        <label>Mission Image (1200 x 800)*</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            accept="image/*"
                            onChange={(e) =>
                              this.handle_file(e, "mission", null, null, true)
                            }
                          />
                          <label className="custom-file-label" for="customFile">
                            Choose Image
                          </label>
                        </div>
                        {mission_file_loading ? (
                          <Loadindicator />
                        ) : (
                          <div style={{ overflow: "scroll" }}>
                            <span>
                              <img
                                className="py-3 rounded"
                                style={{
                                  maxHeight: 200,
                                  maxWidth: 200,
                                  marginRight: 10,
                                }}
                                src={
                                  mission && mission.startsWith("data")
                                    ? mission
                                    : `${domain}/images/${mission}`
                                }
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Stretch_button
                      loading={updating_mission}
                      title="Update Mission Statement"
                      style={{ backgroundColor: "yellow" }}
                      action={this.update_mission}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage_vision_mission_statement;
