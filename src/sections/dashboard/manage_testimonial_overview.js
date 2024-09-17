import React from "react";
import { Col } from "react-bootstrap";
import { domain } from "../../assets/js/utils/constants";
import { get_request, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Video from "../../components/video";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_testimonial_overview extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = { show_vid: true };
  }

  componentDidMount = async () => {
    let testimonials = await get_request("testimonials");

    this.setState({ testimonials, ...testimonials });
  };

  submit = async () => {
    this.setState({ uploading: true });
    let { image, thumbnail, video, image_file_hash, text, title, image_hash } =
      this.state;
    image = image || image;

    await post_request("update_testimonial_overview", {
      thumbnail: image || thumbnail,
      video,
      image_hash: image_file_hash || image_hash,
      text,
      title,
    });

    this.setState({ uploading: false });
  };

  render() {
    let {
      uploading,
      video_file_loading,
      image_file_loading,
      show_vid,
      testimonials,
      thumbnail,
      video,
      image,
      text,
      title,
    } = this.state;
    image = image || thumbnail;

    let video_ = video;
    return (
      <div className="col-12">
        <Dashboard_breadcrumb crumb="alumni overview" />

        <div className="row justify-content-center mb-3">
          {(testimonials || image || video) && show_vid ? (
            <Col lg={6} md={6} sm={12} className="align-items-center">
              {
                <Video
                  url={
                    video_?.startsWith("data")
                      ? video_
                      : `${domain}/videos/${video_}`
                  }
                  thumbnail={image}
                />
              }
            </Col>
          ) : null}
        </div>
        <hr />
        <div className="row ">
          <form>
            <div class="row">
              <div className="form-group smalls">
                <label>Thumbnail *</label>
                {image_file_loading ? (
                  <Loadindicator />
                ) : (
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
                      Choose file
                    </label>
                  </div>
                )}
              </div>
              <div className="form-group smalls">
                <label>Video *</label>
                {video_file_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="video/*"
                      onChange={(e) => this.handle_file(e, "video")}
                      control
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Title</label>
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
                    placeholder="Title"
                  />
                  <i className="ti-text"></i>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>Text</label>
                  <textarea
                    className="form-control"
                    type="number"
                    placeholder="Text..."
                    value={text}
                    onChange={({ target }) =>
                      this.setState({ text: target.value })
                    }
                  ></textarea>
                </div>
              </div>

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  {uploading ? (
                    <Loadindicator />
                  ) : (
                    <a
                      href="#"
                      style={{ color: "#fff" }}
                      onClick={video_ && image && this.submit}
                      class="btn theme-bg btn-md"
                    >
                      Update
                    </a>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Manage_testimonial_overview;
