import React from "react";
import Preview_image from "../components/preview_image";

class More_content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  contents = new Array(
    {
      title: "Unlock Your Trading Potential",
      description:
        "Experience seamless cryptocurrency trading with cutting-edge technology and expert insights.",
      pic: require("../assets/img/im1.jpeg"),
    },
    {
      title: "Trade with Confidence",
      description:
        "Your trusted partner for secure and profitable cryptocurrency trading.",
      pic: require("../assets/img/im2.jpeg"),
    },
    {
      title: "Elevate Your Trading Game",
      description:
        "Stay ahead of the market with real-time data, expert analysis, and advanced trading tools.",
      pic: require("../assets/img/im3.jpeg"),
    },
    {
      title: "Where Trading Meets Innovation",
      description:
        "Discover a smarter way to trade cryptocurrencies with our innovative platform.",
      pic: require("../assets/img/im4.jpeg"),
    },
    {
      title: "Trade with Precision",
      description:
        "Make informed decisions with our expert market analysis, precise trading signals, and advanced risk management tools.",
      pic: require("../assets/img/im5.jpeg"),
    },
    {
      title: "Your Gateway to Cryptocurrency Success",
      description:
        "Start trading with confidence, backed by our expert team, advanced technology, and unparalleled market insights.",
      pic: require("../assets/img/im6.jpeg"),
    }
  );

  render() {
    let { start, end, title } = this.props;

    return (
      <section class="min">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                {title ? (
                  <h2>{title}</h2>
                ) : (
                  <h2>
                    Our <span class="theme-cl">Highlights</span>
                  </h2>
                )}
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p> */}
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            {this.contents.slice(start, end).map((c, i) => {
              return (
                <div key={i} class="col-lg-4 col-md-6">
                  <div class="blg_grid_box">
                    <div class="blg_grid_thumb">
                      {/* <a href="#"> */}
                      <Preview_image image={c.pic} class_name="img-fluid" />
                      {/* </a> */}
                    </div>
                    <div class="blg_grid_caption">
                      <div class="blg_title">
                        <h4>
                          <a href="#">{c.title}</a>
                        </h4>
                      </div>
                      <div class="blg_desc">
                        <p>{c.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default More_content;
