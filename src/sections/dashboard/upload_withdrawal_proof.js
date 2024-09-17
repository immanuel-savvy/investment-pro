import React from "react";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";
import Loadindicator from "../../components/loadindicator";
import Handle_file_upload from "../../components/handle_file_upload";
import { domain } from "../../assets/js/utils/constants";

class Withdrawal_proof extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  copy_alert = () => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: true });

    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  cancel = () => {};

  render() {
    let { toggle, submit } = this.props;
    let { image_file_loading, image } = this.state;

    return (
      <section style={{ paddingTop: 20 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div class="modal-content overli" id="loginmodal">
                <Modal_form_title title="Upload Proof" toggle={toggle} />

                <div class="modal-body">
                  <div class="login-form">
                    <form>
                      <div className="form-group smalls">
                        <label>Icon*</label>
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
                          <div
                            style={{
                              textAlign: "center",
                            }}
                          >
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

                      <Stretch_button
                        title="Submit"
                        disabled={!image}
                        action={() => {
                          toggle();
                          submit(image);
                        }}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Withdrawal_proof;
