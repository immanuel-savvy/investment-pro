import React from "react";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import { domain } from "../../assets/js/utils/constants";
import Small_btn from "../../components/small_btn";
import { post_request } from "../../assets/js/utils/services";

class Manage_logo extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { logo } = this.props;

    this.state = { ...logo };
  }

  update_logo = async () => {
    let { logo, logo_file_hash, loading } = this.state;
    if (loading || !logo) return;

    this.setState({ loading: true });
    let result = await post_request("logo_update", { logo, logo_file_hash });

    this.setState({ logo: result?.logo || logo, loading: false });
  };

  render() {
    let { logo_file_loading, logo, loading } = this.state;

    return (
      <div class="login-form">
        <form>
          <div className="form-group smalls">
            <label>Logo*</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept="image/*"
                onChange={(e) => this.handle_file(e, "logo", null, null, true)}
              />
              <label className="custom-file-label" for="customFile">
                Choose Logo
              </label>
            </div>
            {logo_file_loading ? (
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
                      logo && logo.startsWith("data")
                        ? logo
                        : `${domain}/images/${logo}`
                    }
                  />
                </span>
              </div>
            )}
          </div>

          {loading ? (
            <Loadindicator />
          ) : (
            <Small_btn title="Update Logo" action={this.update_logo} />
          )}
        </form>
      </div>
    );
  }
}

export default Manage_logo;
