import React from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Investment_alt from "./dashboard/investment_alt";

class Recent_investments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let investments = await get_request("recent_investments");

    this.setState({ investments });
  };

  render() {
    let { investments } = this.state;

    if (investments && !investments.length) return;

    return (
      <section className={`gray`}>
        <div className="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  recent <span class="theme-cl">Investments</span>
                </h2>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p> */}
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {investments ? (
              !investments.length ? null : (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  slidesPerView={window.innerWidth < 650 ? 1 : 3}
                  autoplay={{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  loop
                  className="swiper-container"
                >
                  {investments.map((investment, index) => (
                    <SwiperSlide key={index}>
                      <Investment_alt
                        show
                        no_cancel
                        investment={{
                          invest: investment,
                          user: investment.user,
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Recent_investments;
