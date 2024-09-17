import React from "react";
import { Carousel } from "react-bootstrap";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Hero_banner from "../sections/hero_banner";
import Nav from "../sections/nav";
import Testimonials from "../sections/testimonials";
import Who_we_are from "../sections/who_we_are";
import { get_request } from "../assets/js/utils/services";
import Investments from "../sections/investments";
import Articles from "../sections/articles";
import Divs from "../components/divs";
import Section_header from "../components/section_headers";
import More_content from "../sections/more_content";
import Recent_investments from "../sections/recent_investments";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
  }

  componentDidMount = () => {
    let heros = new Array({
      main_text: "",
      sub_text: "",
      bg: require("../assets/img/hero1.jpg"),
    });

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;
    let { entry } = this.props;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Nav page="" />
              <div className="body">
                {entry || heros ? (
                  <div
                    style={{
                      backgroundImage: `url(${require("../assets/img/hero1.png")})`,
                    }}
                  >
                    <Carousel fade nextLabel="" prevLabel="" indicators={false}>
                      {(entry?.banners || heros).map((hero, index) => (
                        <Carousel.Item>
                          <Hero_banner hero={hero} key={index} />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                ) : (
                  <Loadindicator />
                )}

                <Divs />

                <div className="container">
                  <div className="row">
                    <h2 style={{ textAlign: "center" }}>Watch this video</h2>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/nY1ETdxWu1I"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
                <More_content start={0} end={3} />

                <Investments />

                {window.innerWidth > 600 ? null : (
                  <div className="row">
                    <div className="col-12">
                      <Section_header
                        title="currency"
                        color_title="Converter"
                      />

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Divs d={3} />
                      </div>
                    </div>
                  </div>
                )}

                <Divs d={2} />

                {entry ? (
                  <>
                    <Who_we_are home about={entry.about} />

                    {/* <Vision_mission_stuff gray details={entry.vision} />

                    <Vision_mission_stuff reverted details={entry.mission} /> */}
                  </>
                ) : (
                  <Loadindicator />
                )}

                <Recent_investments />

                <More_content title="Why We Are Ahead" start={3} />

                <Testimonials />

                <Articles />

                <Contact_us />
              </div>
              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Home;
