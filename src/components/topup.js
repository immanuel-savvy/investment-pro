import React from "react";
import Alert_box from "./alert_box";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import { Loggeduser } from "../Contexts";
import { domain, post_request } from "../assets/js/utils/services";
import Login from "./login";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import { to_title } from "../assets/js/utils/functions";
import CopyToClipboard from "react-copy-to-clipboard";
import Text_btn from "./text_btn";
import Handle_file_upload from "./handle_file_upload";
import Topup_success from "./topup_success";

class Topup extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  proceed = () => {
    let { value, updating, image, currency } = this.state;
    if (updating) return;

    this.setState({ updating: true });

    if (!image) return this.setState({ updating: false, upload_proof: true });

    post_request("topup_request", {
      value: Number(value),
      image,
      currency,
      user: this.loggeduser?._id,
      wallet: this.loggeduser?.wallet,
    })
      .then((res) => {
        this.setState({ success: true });
      })
      .catch((e) =>
        this.setState({
          message: "Cannot proceed with topup.",
          updating: false,
        })
      );
  };

  copy_alert = () => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: true });

    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  cancel = () => {};

  render() {
    let { toggle } = this.props;
    let {
      value,
      message,
      copied,
      image_file_loading,
      image,
      updating,
      currency,
      success,
      upload_proof,
    } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, entry }) => {
          this.loggeduser = loggeduser;
          let { currencies } = entry || new Object();

          if (!this.loggeduser)
            return (
              <Login action={this.set_details} no_redirect toggle={toggle} />
            );

          let currency_full = currencies?.find((c) => c._id === currency);

          return (
            <section style={{ paddingTop: 20 }}>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    {success ? (
                      <Topup_success
                        toggle={toggle}
                        details={{ currency, image, value }}
                      />
                    ) : upload_proof ? (
                      <div class="modal-content overli" id="loginmodal">
                        <Modal_form_title
                          title="Upload Proof"
                          toggle={toggle}
                        />

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
                                      this.handle_file(
                                        e,
                                        "image",
                                        null,
                                        null,
                                        true
                                      )
                                    }
                                  />
                                  <label
                                    className="custom-file-label"
                                    for="customFile"
                                  >
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

                              {message ? <Alert_box message={message} /> : null}

                              <Stretch_button
                                title="Submit"
                                disabled={
                                  !/[0-9]{1,}/.test(value) ||
                                  !currency ||
                                  !image
                                }
                                loading={updating}
                                action={this.proceed}
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form>
                        <div className="crs_log_wrap">
                          <Modal_form_title title="Topup" toggle={toggle} />

                          <>
                            <Text_input
                              value={value}
                              type="number"
                              title="Value ($)"
                              action={(value) =>
                                this.setState({
                                  value,
                                  message: "",
                                })
                              }
                              important
                            />

                            <div className="form-group mx-3">
                              <label>Currency</label>
                              {currencies ? (
                                currencies.length ? (
                                  <div className="simple-input">
                                    <select
                                      defaultValue={currency}
                                      id="currency"
                                      onChange={({ target }) =>
                                        this.setState({
                                          currency: target.value,
                                        })
                                      }
                                      className="form-control"
                                    >
                                      <option value="" disabled selected>
                                        -- Select Currency --
                                      </option>
                                      {currencies.map((currency) => (
                                        <option
                                          key={currency._id}
                                          value={currency._id}
                                        >
                                          {to_title(
                                            currency.name.replace(/_/g, " ")
                                          )}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : (
                                  <Listempty text="Cannot get currencies." />
                                )
                              ) : (
                                <Loadindicator smalls />
                              )}
                            </div>

                            {currency_full ? (
                              <div class="col-12">
                                <div class="edu_cat_2 cat-1">
                                  <div class="edu_cat_icons">
                                    <a class="pic-main" href="#">
                                      <img
                                        src={`${domain}/images/${currency_full?.image}`}
                                        class="img-fluid"
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                  <div class="edu_cat_data">
                                    <h4 class="title">
                                      <a href="#">Wallet Address</a>
                                    </h4>
                                    <ul class="meta">
                                      <li class="video">
                                        <i class="ti-wallet"></i>
                                        {currency_full?.wallet_address}
                                        <br />
                                        <CopyToClipboard
                                          text={currency_full?.wallet_address}
                                          onCopy={this.copy_alert}
                                        >
                                          <span>
                                            <Text_btn
                                              icon={
                                                copied ? "fa-check" : "fa-copy"
                                              }
                                              text={
                                                copied
                                                  ? "Address Copied!"
                                                  : "Copy Wallet Address"
                                              }
                                            />
                                          </span>
                                        </CopyToClipboard>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </>
                          {message ? <Alert_box message={message} /> : null}

                          <Stretch_button
                            title="Proceed to Upload Proof"
                            disabled={!/[0-9]{1,}/.test(value) || !currency}
                            loading={updating}
                            action={this.proceed}
                          />
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Topup;
