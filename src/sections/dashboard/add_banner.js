import React from "react";
import { domain, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";

class Add_banner extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { banner } = this.props;
    this.state = { title: "", sub_text: "", ...banner };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let { title, image, image_file_hash, sub_text, _id } = this.state;
    this.setState({ loading: true });

    let cat = {
      title: title.trim(),
      _id,
      image,
      image_file_hash,
      sub_text,
    };

    let result = await post_request(_id ? "update_banner" : "add_banner", cat);

    if (result?._id) {
      cat._id = result._id;
      cat.image = result.image;
      cat.created = result.created;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message: result?.message || "Cannot create banner at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let { title, loading, sub_text, _id, image, image_file_loading } =
      this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Add banner" toggle={toggle} />

          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="form-group smalls">
                  <label>Background Image*</label>
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

                <div class="form-group">
                  <label>Title</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={title}
                      onChange={({ target }) =>
                        this.setState({
                          title: target.value,
                          message: "",
                        })
                      }
                      placeholder="Title"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>Sub Text</label>
                  <div class="">
                    <input
                      type={"text"}
                      class="form-control"
                      placeholder="Sub Text"
                      value={sub_text}
                      onChange={({ target }) =>
                        this.setState({
                          sub_text: target.value,
                          message: "",
                        })
                      }
                    />
                  </div>
                </div>

                <div class="form-group">
                  <Stretch_button
                    disabled={!title.trim() || !sub_text.trim() || !image}
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
  }
}

export default Add_banner;
