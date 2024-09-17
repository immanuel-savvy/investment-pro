import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";
import { Loggeduser } from "../../Contexts";

class Add_investment extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { investment } = this.props;
    this.state = {
      title: "",
      percentage_return: "",
      ...investment,
      currency: investment?.currency?._id,
    };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let {
      title,
      percentage_return,
      duration,
      image_file_hash,
      referral_bonus,
      maximum,
      minimum,
      _id,
    } = this.state;
    this.setState({ loading: true });

    let cat = {
      title: title.trim(),
      _id,
      referral_bonus,
      image_file_hash,
      duration,
      maximum,
      minimum,
      percentage_return,
    };

    let result = await post_request(
      _id ? "update_investment" : "add_investment",
      cat
    );

    if (result?._id) {
      cat._id = result._id;
      cat.image = result.image;
      cat.created = result.created;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message: result?.message || "Cannot create investment at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let {
      title,
      percentage_return,
      referral_bonus,
      loading,
      duration,
      _id,
      minimum,
      maximum,
    } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, entry }) => {
          this.loggeduser = loggeduser;
          let { currencies } = entry || new Object();

          return (
            <div>
              <div className="modal-content overli" id="loginmodal">
                <Modal_form_title title="Add Investment" toggle={toggle} />

                <div className="modal-body">
                  <div className="login-form">
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <div className="input-with-icon">
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={({ target }) =>
                              this.setState({
                                title: target.value,
                                message: "",
                              })
                            }
                            placeholder="Investment Title"
                          />
                          <i className="ti-text"></i>
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group">
                          <label>Price Range</label>
                        </div>
                        <div className="col-6 form-group">
                          <label>Minimum</label>
                          <input
                            type={"number"}
                            className="form-control"
                            value={minimum}
                            onChange={({ target }) =>
                              this.setState({
                                minimum: target.value,
                                message: "",
                              })
                            }
                          />
                        </div>
                        <div className="col-6 form-group">
                          <label>Maximum</label>
                          <input
                            type={"number"}
                            className="form-control"
                            value={maximum}
                            onChange={({ target }) =>
                              this.setState({
                                maximum: target.value,
                                message: "",
                              })
                            }
                          />
                        </div>

                        <div className="col-6 form-group">
                          <label>Percentage Return</label>
                          <div className="input-with-icon">
                            <input
                              type={"number"}
                              className="form-control"
                              value={percentage_return}
                              onChange={({ target }) =>
                                this.setState({
                                  percentage_return: target.value,
                                  message: "",
                                })
                              }
                            />
                            <i className="fa fa-percentage"></i>
                          </div>
                        </div>
                        <div className="col-6 form-group">
                          <label>Referral Bonus</label>
                          <div className="input-with-icon">
                            <input
                              type={"number"}
                              className="form-control"
                              value={referral_bonus}
                              onChange={({ target }) =>
                                this.setState({
                                  referral_bonus: target.value,
                                  message: "",
                                })
                              }
                            />
                            <i className="fa fa-percentage"></i>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Duration (hours)</label>
                        <div className="input-with-icon">
                          <input
                            type={"number"}
                            className="form-control"
                            value={duration}
                            onChange={({ target }) =>
                              this.setState({
                                duration: target.value,
                                message: "",
                              })
                            }
                          />
                          <i className="ti-link"></i>
                        </div>
                      </div>

                      <div className="form-group">
                        <Stretch_button
                          disabled={
                            !title.trim() ||
                            !duration ||
                            (!Number(maximum) && Number(maximum) !== 0) ||
                            (!Number(minimum) && Number(minimum) !== 0) ||
                            !percentage_return.trim()
                          }
                          loading={loading}
                          title={_id ? "Update" : "Add"}
                          action={this.add}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Add_investment;
