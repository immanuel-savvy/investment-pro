import React from "react";
import { domain } from "../../assets/js/utils/constants";
import { get_request, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Small_btn from "../../components/small_btn";
import Stretch_button from "../../components/stretch_button";
import Text_btn from "../../components/text_btn";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_about_statement extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = { bullets: new Array() };
  }

  componentDidMount = async () => {
    let about_statement = await get_request("about_statement");

    this.setState({ ...about_statement });
  };

  update = async () => {
    let { image, image_file_hash, more_details, bullets, about_statement } =
      this.state;

    this.setState({ updating: true });

    let res = await post_request("update_about_statement", {
      about_statement,
      image,
      image_file_hash,
      more_details,
      bullets: bullets.filter((b) => b),
    });

    this.setState({ updating: false, image: res?.image });
  };

  add_feature = () => {
    let { feature, bullets, feature_in_edit } = this.state;

    if (typeof feature_in_edit === "number") bullets[feature_in_edit] = feature;
    else bullets = new Array(feature, ...bullets);

    this.setState({ bullets, feature_in_edit: null, feature: "" });
  };

  render() {
    let {
      updating,
      image,
      image_file_loading,
      feature,
      bullets: features,
      about_statement,
      feature_in_edit,
      more_details,
    } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb crumb="about statement" />
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-6 col-sm-12">
            <div className="crs_grid">
              <div className="modal-header">
                <h5 className="modal-title text-dark">About Statement</h5>
              </div>

              <div className="modal-body">
                <div className="login-form">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>About Statement</label>
                          <textarea
                            className="form-control"
                            type="number"
                            placeholder="About Statement..."
                            value={about_statement}
                            onChange={({ target }) =>
                              this.setState({ about_statement: target.value })
                            }
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-group smalls">
                        <label>Image (1200 x 800)*</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            accept="image/*"
                            onChange={(e) =>
                              this.handle_file(e, "image", null, null, true)
                            }
                          />
                          <label className="custom-file-label" for="customFile">
                            Choose Image
                          </label>
                        </div>
                        {image_file_loading ? (
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
                                  image && image.startsWith("data")
                                    ? image
                                    : `${domain}/images/${image}`
                                }
                              />
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Features</label>
                          <input
                            className="form-control"
                            placeholder="Add Feature..."
                            value={feature}
                            onChange={({ target }) =>
                              this.setState({ feature: target.value })
                            }
                          />
                        </div>

                        <Small_btn
                          title={
                            typeof feature_in_edit === "number" ? "Edit" : "Add"
                          }
                          action={this.add_feature}
                        />

                        <br />
                        <br />
                      </div>

                      {features && features.length
                        ? features.map(
                            (feature, index) =>
                              feature && (
                                <div
                                  class="mb-3 mr-4 ml-lg-0 mr-lg-4"
                                  key={index}
                                >
                                  <div class="d-flex align-items-center">
                                    <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                      <i class="fas fa-check"></i>
                                    </div>
                                    <h6 class="mb-0 ml-3">{feature}</h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Text_btn
                                      icon="fa-edit"
                                      action={() =>
                                        this.setState({
                                          feature_in_edit: index,
                                          feature,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              )
                          )
                        : null}

                      <div className="col-12">
                        <div className="form-group">
                          <label>More Details</label>
                          <textarea
                            className="form-control"
                            type="number"
                            placeholder="More details..."
                            value={more_details}
                            onChange={({ target }) =>
                              this.setState({ more_details: target.value })
                            }
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <Stretch_button
                      loading={updating}
                      title="Update"
                      action={this.update}
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

export default Manage_about_statement;
