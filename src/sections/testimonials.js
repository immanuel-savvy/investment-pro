import React from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Explore_more from "../components/explore_more";
import { post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Review from "../components/review";
import Testimonials_header from "../components/testimonials_header";

class Testimonials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await post_request("reviews", { verified: true, limit: 12 });
    this.setState({ reviews });
  };

  toggle_add_review = () =>
    this.setState({ add_review: !this.state.add_review });

  render() {
    let { no_gray } = this.props;
    let { reviews, videos } = this.state;

    return (
      <section className={no_gray ? "" : `gray`}>
        <div className="container">
          <Testimonials_header />

          <div className="row justify-content-center">
            {reviews ? (
              !reviews.length ? null : (
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
                  {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <Review review={review} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          {reviews && reviews.length ? (
            <Explore_more title="Testimonies" to={"testimonials"} />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Testimonials;
