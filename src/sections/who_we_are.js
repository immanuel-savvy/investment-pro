import React from "react";
import ReactMarkdown from "react-markdown";
import { client_domain } from "../assets/js/utils/constants";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Small_btn from "../components/small_btn";

const Img_tag = ({ src }) => {
  return (
    <img
      src={src}
      className="img-fluid rounded"
      style={{
        width: "100%",
      }}
    />
  );
};

const A_tag = ({ href, children }) => {
  return (
    <a href={href} className="theme-cl" target="_blank">
      {children}
    </a>
  );
};

class Who_we_are extends React.Component {
  constructor(props) {
    super(props);

    let { about } = this.props;
    this.state = { about };
  }

  componentDidMount = async () => {};

  render() {
    let { home } = this.props;
    let { about } = this.state;

    let { about_statement, more_details, image, image_file_hash, bullets } =
      about || new Object();

    return (
      <>
        <section>
          <div className="container">
            {home ? (
              <Section_header
                title="Who we are"
                description="Discover who we are, our values, and how we can partner with you to navigate the ever-evolving landscape of business and technology."
              />
            ) : null}

            <div className="row align-items-center justify-content-between">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="lmp_caption">
                  {home ? null : (
                    <>
                      <span className="theme-cl">About Us</span>
                      <h2 className="mb-3">What We Do & Our Aim</h2>
                    </>
                  )}
                  {about_statement?.split("\n").map((s, i) => (
                    <p key={i}>
                      {
                        <ReactMarkdown
                          children={s}
                          components={{
                            img: Img_tag,
                            a: A_tag,
                          }}
                        />
                      }
                    </p>
                  ))}

                  {bullets
                    ? bullets.map((bull, i) => (
                        <div key={i} className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                              <i className="fas fa-check"></i>
                            </div>
                            <span className="mb-0 ml-3">
                              <ReactMarkdown
                                children={bull}
                                components={{
                                  img: Img_tag,
                                  a: A_tag,
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      ))
                    : null}

                  {home ? (
                    <Small_btn
                      title="Learn More"
                      action={() =>
                        window.location.assign(`${client_domain}/about`)
                      }
                    />
                  ) : null}
                </div>
              </div>

              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <div className="lmp_thumb">
                  <Preview_image image={image} image_hash={image_file_hash} />
                </div>
              </div>
            </div>
          </div>
          {home || !more_details ? null : (
            <div className="container mt-5">
              {more_details.split("\n").map((t, index) => (
                <p className="text-justify" key={index}>
                  <ReactMarkdown
                    children={t}
                    components={{
                      img: Img_tag,
                      a: A_tag,
                    }}
                  />
                </p>
              ))}
            </div>
          )}
        </section>
      </>
    );
  }
}

export default Who_we_are;
export { Img_tag, A_tag };
