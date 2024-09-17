import React from "react";
import { Col } from "react-bootstrap";
import { domain, get_request } from "../assets/js/utils/services";
import Video from "./video";

class Testimonials_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let testimonials = await get_request("testimonials");

    this.setState({ testimonials });
  };

  render() {
    let { testimonials } = this.state;
    let { title, text, video, thumbnail, thumbnail_hash } =
      testimonials || new Object();

    return (
      <div className="row mb-3">
        <div
          className={`col-lg-${testimonials ? "6" : "12"} col-md-${
            testimonials ? "6" : "12"
          } ${
            testimonials ? "" : "justify-content-center"
          } col-sm-12 align-items-center d-flex`}
        >
          <div className="">
            <h2>{title || "Discover the Voices of Our Valued Community"}</h2>
            <p className="lead">
              {text ||
                `Dive into a world of inspiring testimonials that highlight the
              positive impact our services have had on their lives. From
              life-changing transformations to memorable moments of success,
              these stories serve as a testament to the quality and
              effectiveness of our offerings. Join us in celebrating the
              journeys and achievements of our community members and get
              inspired to embark on your own path to success.`}
            </p>
            <br />
            <br />
          </div>
        </div>
        {testimonials ? (
          <Col lg={6} md={6} sm={12} className="align-items-center">
            <Video
              url={`${domain}/videos/${video}`}
              thumbnail={thumbnail}
              thumbnail_hash={thumbnail_hash}
            />
          </Col>
        ) : null}
      </div>
    );
  }
}

export default Testimonials_header;
