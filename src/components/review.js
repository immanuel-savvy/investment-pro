import React from "react";
import { to_title } from "../assets/js/utils/functions";
import Preview_image from "./preview_image";
import Small_btn from "./small_btn";

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_full_text = () => this.setState({ full_text: !this.state.full_text });

  render() {
    let { review, remove, testimonials, edit, approve_review } = this.props;
    let { full_text } = this.state;
    let { image, name, organisation, image_hash, position, rating, text } =
      review;
    text = text[0].toUpperCase() + text.slice(1);

    return (
      <div
        className={
          remove || testimonials
            ? "col-md-8 col-xl-4 col-lg-6 col-sm-12 mb-3"
            : "single_items lios_item mb-3"
        }
      >
        <div className="_testimonial_wrios">
          <div className="_testimonial_flex">
            <div className="_testimonial_flex_first">
              <div className="_tsl_flex_thumb">
                <Preview_image
                  image={image}
                  image_hash={image_hash}
                  height={70}
                  width={70}
                />
              </div>
              <div className="_tsl_flex_capst">
                <h5 style={{ fontSize: 16, marginBottom: 5 }}>{name}</h5>
                <div className="_ovr_posts">
                  <span style={{ fontSize: 14 }}>
                    {to_title(`${position}, ${organisation}`)}
                  </span>
                </div>
                {review.verified ? (
                  <></> || (
                    <div className="_ovr_rates">
                      <span>
                        <i className="fa fa-star"></i>
                      </span>
                      {`${rating || 1.0}`}
                    </div>
                  )
                ) : approve_review ? (
                  <Small_btn
                    action={() =>
                      window.confirm("Approve review?") && approve_review()
                    }
                    title="Approve"
                  />
                ) : (
                  <em>Awaiting Confirmation...</em>
                )}
              </div>
            </div>
            {edit ? (
              <a onClick={edit} className="btn btn-action px-2">
                <i className={`fas fa-edit`}></i>
              </a>
            ) : null}
            {remove ? (
              <a
                onClick={() => window.confirm("Remove review?") && remove()}
                className="btn btn-action"
              >
                <i className={`fas fa-window-close`}></i>
              </a>
            ) : null}
          </div>
          <div className="facts-detail">
            <a onClick={this.toggle_full_text} style={{ cursor: "pointer" }}>
              <p>{full_text ? text : text.slice(0, 150)}</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
