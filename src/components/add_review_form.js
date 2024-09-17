import React from "react";
import { post_request } from "../assets/js/utils/services";
import { emitter } from "../App";
import Handle_file_upload from "./handle_file_upload";
import Loadindicator from "./loadindicator";

class Add_student_review extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { review } = this.props;

    this.default_image = "user_image_placeholder.png";
    this.state = {
      image: require("../assets/img/user_image_placeholder.png"),
      ...review,
    };
  }

  set_name = ({ target }) => this.setState({ name: target.value });

  set_email = ({ target }) => this.setState({ email: target.value });

  set_organisation = ({ target }) =>
    this.setState({ organisation: target.value });

  set_text = ({ target }) => this.setState({ text: target.value });

  set_position = ({ target }) => this.setState({ position: target.value });

  toggle_image_selector = () =>
    document.getElementById("review_image_selector").click();

  on_post_review = async (e) => {
    e.preventDefault();

    let { admin, toggle, on_submit } = this.props;
    let {
      name,
      email,
      image_file_hash,
      text,
      image,
      organisation,
      position,
      posting,
      _id,
    } = this.state;
    if (posting) return;

    this.setState({ posting: true });

    let review = {
      name,
      email,
      text,
      image_hash: image_file_hash,
      image: typeof image !== "string" ? this.default_image : image,
      organisation,
      position,
      verified: !!admin,
      _id,
    };

    let result = await post_request("new_review", review);
    if (!result || (result && !result._id)) return;

    review._id = result._id;
    review.image = result.image;
    review.created = result.created;

    admin && emitter.emit(_id ? "review_updated" : "new_alumni_review", review);

    on_submit && on_submit(review);
    toggle();
  };

  render() {
    let { toggle } = this.props;

    let { name, email, text, image, organisation, position, posting } =
      this.state;

    return (
      <div className="row justify-content-center">
        <div class="edu_wraper">
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <span class="edu_title h4">Submit Reviews</span>
            <a onClick={toggle} className="btn btn-action">
              <i className={`fas fa-window-close`}></i>
            </a>
          </div>
          <div class="review-form-box form-submit">
            <form>
              <div class="row">
                <div class="d-flex align-items-center justify-content-center">
                  {image ? (
                    <img
                      onClick={this.toggle_image_selector}
                      className="py-3"
                      style={{
                        maxHeight: 200,
                        cursor: "pointer",
                        maxWidth: 200,
                        resize: "both",
                      }}
                      src={this.state.image}
                    />
                  ) : null}
                  <input
                    type="file"
                    className="custom-file-input"
                    id="review_image_selector"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      this.handle_file(e, "image", null, null, true)
                    }
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Name*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={this.set_name}
                    />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Email*</label>
                    <input
                      class="form-control"
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={this.set_email}
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Organisation*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Where you work"
                      value={organisation}
                      onChange={this.set_organisation}
                    />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Position*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="What you do"
                      value={position}
                      onChange={this.set_position}
                    />
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    <label>Review*</label>
                    <textarea
                      class="form-control ht-140"
                      placeholder="Review"
                      value={text}
                      onChange={this.set_text}
                    ></textarea>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    {posting ? (
                      <Loadindicator />
                    ) : (
                      <a
                        href="#"
                        style={{ color: "#fff" }}
                        onClick={
                          name &&
                          text &&
                          organisation &&
                          position &&
                          email &&
                          this.on_post_review
                        }
                        class="btn theme-bg btn-md"
                      >
                        Submit Review
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_student_review;
